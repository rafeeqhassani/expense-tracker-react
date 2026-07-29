import { useReducer, useRef } from "react";

import { normalizeExpenseData, isSameData } from "../utils/expenseTransform";
import { validateExpenseForm } from "../utils/validation";

const CATEGORY_FIELD_NAMES = ["category", "customCategory"];

const createInitialFormData = () => ({
  title: "",
  amount: "",
  category: "",
  customCategory: "",
  date: "",
  recurring: "none",
});

const getInitialState = () => ({
  formData: createInitialFormData(),
  errors: {},
  touched: {},
  submitAttempted: false,
  isFormOpen: false,
  mode: "add",
  editingId: null,
});

function clearErrors(errors, fieldNames) {
  const nextErrors = { ...errors };
  fieldNames.forEach((fieldName) => delete nextErrors[fieldName]);
  return nextErrors;
}

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_FORM":
      return { ...state, isFormOpen: true };

    case "CLOSE_FORM":
      return {
        ...getInitialState(),
        isFormOpen: false,
      };

    case "SET_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value,
        },
      };

    case "SET_CATEGORY":
      return {
        ...state,
        formData: {
          ...state.formData,
          category: action.payload.category,
          customCategory: action.payload.customCategory,
        },
      };

    case "SET_TOUCHED":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload.name]: true,
        },
      };

    case "SET_SUBMIT_ATTEMPTED":
      return {
        ...state,
        submitAttempted: action.payload,
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };

    case "CLEAR_FIELD_ERROR":
      return {
        ...state,
        errors: clearErrors(state.errors, [action.payload]),
      };

    case "CLEAR_FIELD_ERRORS":
      return {
        ...state,
        errors: clearErrors(state.errors, action.payload),
      };

    case "RESET_FORM":
      return {
        ...state,
        formData: createInitialFormData(),
        errors: {},
        touched: {},
        submitAttempted: false,
        isFormOpen: false,
        mode: "add",
        editingId: null,
      };

    case "EDIT_EXPENSE":
      return {
        ...state,
        formData: {
          title: action.payload.title ?? "",
          amount: action.payload.amount ?? "",
          category: action.payload.category ?? "",
          customCategory: action.payload.customCategory ?? "",
          date: action.payload.date ?? "",
          recurring: action.payload.recurring ?? "none",
        },
        mode: "edit",
        editingId: action.payload.id,
        isFormOpen: true,
        errors: {},
        touched: {},
        submitAttempted: false,
      };

    default:
      return state;
  }
}

function useExpenseForm({
  expenses,
  handleAddExpense,
  handleUpdateExpense,
  showToastMessage,
}) {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const submitLock = useRef(false);
  const { formData, mode, editingId } = state;

  const openForm = () => {
    dispatch({ type: "OPEN_FORM" });
  };

  const closeForm = () => {
    dispatch({ type: "CLOSE_FORM" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category" || name === "customCategory") {
      const isCategory = name === "category";

      dispatch({
        type: "SET_CATEGORY",
        payload: {
          category: isCategory ? value : "",
          customCategory: isCategory ? "" : value,
        },
      });

      dispatch({ type: "CLEAR_FIELD_ERRORS", payload: CATEGORY_FIELD_NAMES });
    } else {
      dispatch({ type: "SET_FIELD", payload: { name, value } });
      dispatch({ type: "CLEAR_FIELD_ERROR", payload: name });
    }

    dispatch({ type: "SET_TOUCHED", payload: { name } });
  };

  function handleSubmit(e) {
    e?.preventDefault();

    if (submitLock.current) return;
    submitLock.current = true;

    try {
      dispatch({ type: "SET_SUBMIT_ATTEMPTED", payload: true });

      const formSnapshot = { ...formData };
      const formErrors = validateExpenseForm(formSnapshot);

      if (Object.keys(formErrors).length > 0) {
        dispatch({ type: "SET_ERRORS", payload: formErrors });
        return;
      }

      const normalizedData = normalizeExpenseData(
        {
          ...formSnapshot,
          category: formSnapshot.category || formSnapshot.customCategory,
        },
        mode === "edit" ? editingId : null,
      );

      if (mode === "add") {
        handleAddExpense(normalizedData);
      } else {
        const existingExpense = expenses.find(
          (expense) => expense.id === editingId,
        );

        if (!existingExpense) {
          showToastMessage("Expense not found", "info");
          return;
        }

        if (isSameData(existingExpense, normalizedData)) {
          showToastMessage("No changes detected", "info");
          return;
        }

        handleUpdateExpense(editingId, normalizedData);
      }

      dispatch({ type: "RESET_FORM" });
    } finally {
      submitLock.current = false;
    }
  }

  function handleEditExpense(id) {
    const expense = expenses.find(
      (expense) => expense.id === id && !expense.deleted,
    );

    if (!expense) {
      showToastMessage("No expenses found", "info");
      return;
    }

    dispatch({ type: "EDIT_EXPENSE", payload: expense });
  }

  return {
    ...state,
    openForm,
    closeForm,
    handleChange,
    handleSubmit,
    handleEditExpense,
  };
}

export default useExpenseForm;
