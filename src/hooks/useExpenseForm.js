import { useReducer } from "react";

import { validateForm, editExpense } from "../utils/expenseFormState";
import { normalizedData, isSameData } from "../utils/expenseTransform";

const selectedCategory = "";
const customCategory = "";
const initialFormData = {
  title: "",
  amount: "",
  category: selectedCategory || customCategory,
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
          title: action.payload.title || "",
          amount: action.payload.amount || "",
          category: action.payload.category || "",
          date: action.payload.date || "",
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
        errors: {},
        mode: "add",
        editingId: null,
        isFormOpen: false,
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
  const { formData, isFormOpen, mode, editingId, errors } = state;

  const openForm = () => {
    dispatch({ type: "OPEN_FORM" });
  };

  const closeForm = () => dispatch({ type: "CLOSE_FORM" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "HANDLE_CHANGE",
      payload: { name, value },
    });
  };

  const handleEditExpense = (id) => {
    const expense = editExpense(expenses, id);

    if (!expense) {
      showToastMessage("Expense not found", "info");
      return;
    }
    dispatch({ type: "EDIT_EXPENSE", payload: expense });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length) {
      dispatch({ type: "SET_ERRORS", payload: errors });
      return;
    }

    dispatch({ type: "CLEAR_ERRORS" });

    const dataToSubmit = normalizedData(formData);

    if (mode === "add") {
      handleAddExpense(dataToSubmit);
    } else {
      const existing = expenses.find((e) => e.id === editingId);

      if (!existing) {
        showToastMessage("Expense not found", "info");
        return;
      }

      if (isSameData(existing, dataToSubmit)) {
        showToastMessage("No changes detected", "info");
        return;
      }

      handleUpdateExpense(editingId, dataToSubmit);
    }

    dispatch({ type: "RESET_FORM" });
    const successMessage = mode === "add" ? "Expense added" : "Expense updated";
    showToastMessage(successMessage, "success");
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
  };
}

export default useExpenseForm;
