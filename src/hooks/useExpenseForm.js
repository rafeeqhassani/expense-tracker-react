import { useReducer } from "react";

import { validateForm, editExpense } from "../utils/expenseFormState";
import { normalizedData, isSameData } from "../utils/expenseTransform";

const createInitialFormData = () => ({
  title: "",
  amount: "",
  category: "",
  customCategory: "",
  date: "",
});

const initialState = {
  formData: createInitialFormData(),
  errors: {},
  touched: {},
  submitAttempted: false,
  isFormOpen: false,
  mode: "add",
  editingId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_FORM":
      return { ...state, isFormOpen: true };

    case "CLOSE_FORM":
      return {
        ...state,
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

    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: {},
      };

    case "CLEAR_FIELD_ERROR": {
      const copy = { ...state.errors };
      delete copy[action.payload];
      return {
        ...state,
        errors: copy,
      };
    }

    case "RESET_FORM":
      return {
        ...state,
        formData: createInitialFormData(),
        errors: {},
        touched: {},
        submitAttempted: false,
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
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    formData,
    errors,
    touched,
    submitAttempted,
    isFormOpen,
    mode,
    editingId,
  } = state;

  const openForm = () => {
    dispatch({ type: "OPEN_FORM" });
  };

  const closeForm = () => {
    dispatch({ type: "CLOSE_FORM" });
  };

  function handleEditExpense(id) {
    const expense = editExpense(expenses, id);

    if (!expense) {
      showToastMessage("No expenses found", "info");
    }

    dispatch({ type: "EDIT_EXPENSE", payload: expense });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      dispatch({
        type: "SET_CATEGORY",
        payload: { category: value, customCategory: "" },
      });
    } else if (name === "customCategory") {
      dispatch({
        type: "SET_CATEGORY",
        payload: { category: "", customCategory: value },
      });
    } else {
      dispatch({
        type: "SET_FIELD",
        payload: { name, value },
      });
    }

    dispatch({
      type: "SET_TOUCHED",
      payload: { name },
    });

    if (submitAttempted || touched[name]) {
      dispatch({
        type: "CLEAR_FIELD_ERROR",
        payload: name,
      });
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    dispatch({ type: "SET_SUBMIT_ATTEMPTED", payload: true });

    const snapshot = { ...formData };
    const formErrors = validateForm(snapshot);

    if (Object.keys(formErrors).length > 0) {
      dispatch({ type: "SET_ERRORS", payload: formErrors });
      return;
    }

    const data = normalizedData({
      ...snapshot,
      category: snapshot.category || snapshot.customCategory,
    });

    if (mode === "add") {
      handleAddExpense(data);
    } else {
      const existing = expenses.find((e) => e.id === editingId);

      if (!existing) {
        showToastMessage("Expense not found", "info");
        return;
      }

      if (isSameData(existing, data)) {
        showToastMessage("No changes detected to update");
        return;
      }

      handleUpdateExpense(editingId, data);
    }

    setTimeout(() => {
      showToastMessage?.(
        mode === "add" ? "Expense added" : "Expense updated",
        "success",
      );
    }, 0);

    dispatch({ type: "RESET_FORM" });
    closeForm();
  }

  return {
    formData,
    errors,
    touched,
    submitAttempted,
    isFormOpen,
    mode,
    openForm,
    closeForm,
    handleChange,
    handleSubmit,
    handleEditExpense,
  };
}

export default useExpenseForm;
