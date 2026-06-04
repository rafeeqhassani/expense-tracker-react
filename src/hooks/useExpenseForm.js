import { useReducer } from "react";

import { validateForm, editExpense } from "../utils/expenseFormState";
import { normalizedData, isSameData } from "../utils/expenseTransform";

const initialFormData = {
  title: "",
  amount: "",
  category: "",
  customCategory: "",
  date: "",
};

const initialState = {
  formData: initialFormData,
  isFormOpen: false,
  errors: {},
  mode: "add",
  editingId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_FORM":
      return {
        ...state,
        isFormOpen: true,
      };

    case "CLOSE_FORM":
      return {
        ...state,
        isFormOpen: false,
      };

    case "HANDLE_CHANGE": {
      const { name, value } = action.payload;

      return {
        ...state,
        formData: {
          ...state.formData,
          [name]: value,
        },
      };
    }

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
      };

    case "SET_ERRORS":
      return { ...state, errors: action.payload };

    case "CLEAR_ERRORS":
      return { ...state, errors: {} };

    case "RESET_FORM":
      return {
        ...state,
        formData: initialFormData,
        mode: "add",
        editingId: null,
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
  const { formData, isFormOpen, mode, errors, editingId } = state;

  const openForm = () => {
    dispatch({ type: "OPEN_FORM" });
  };

  const closeForm = () => {
    dispatch({ type: "CLEAR_ERRORS" });
    resetForm();
    dispatch({ type: "CLOSE_FORM" });
  };

  const resetForm = () => dispatch({ type: "RESET_FORM" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "HANDLE_CHANGE",
      payload: { name, value },
    });

    if (name === "category") {
      dispatch({
        type: "HANDLE_CHANGE",
        payload: { name: "customCategory", value: "" },
      });
    }

    if (name === "customCategory") {
      dispatch({
        type: "HANDLE_CHANGE",
        payload: { name: "category", value: "" },
      });
    }
  };

  const handleEditExpense = (id) => {
    const expense = editExpense(expenses, id);

    if (!expense) {
      showToastMessage("Expense not found", "info");
      return;
    }
    dispatch({ type: "EDIT_EXPENSE", payload: expense });
  };

  function resolveCategory(formData) {
    return formData.customCategory || formData.category;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const snapshot = { ...formData };
    const formErrors = validateForm(snapshot);

    if (Object.keys(formErrors).length) {
      dispatch({ type: "SET_ERRORS", payload: formErrors });
      return;
    }

    const data = normalizedData({
      ...snapshot,
      category: resolveCategory(snapshot),
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
        showToastMessage("No changes detected", "info");
        return;
      }

      handleUpdateExpense(editingId, data);
    }
    const succesMessage = mode === "add" ? "Expense added" : "Expense updated";
    showToastMessage(succesMessage, "success");

    closeForm();
  }

  return {
    formData,
    errors,
    mode,
    isFormOpen,
    openForm,
    closeForm,
    handleChange,
    handleSubmit,
    handleEditExpense,
    resetForm,
  };
}

export default useExpenseForm;
