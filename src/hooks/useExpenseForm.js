import { useReducer } from "react";

import { validateForm, editExpense } from "../utils/expenseFormState";
import { normalizedData, isSameData } from "../utils/expenseTransform";

const initialFormData = {
  title: "",
  amount: "",
  category: "",
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
  const { formData, isFormOpen, mode, errors } = state;

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

    const snapshot = {
      formData: state.formData,
      mode: state.mode,
      editingId: state.editingId,
    };

    const formErrors = validateForm(snapshot.formData);

    if (Object.keys(formErrors).length) {
      dispatch({ type: "SET_ERRORS", payload: formErrors });
      return;
    }

    dispatch({ type: "CLEAR_ERRORS" });

    const data = normalizedData(snapshot.formData);

    if (snapshot.mode === "add") {
      handleAddExpense(data);
    } else {
      const existing = expenses.find((e) => e.id === snapshot.editingId);

      if (!existing) {
        showToastMessage("Expense not found", "info");
        return;
      }

      if (isSameData(existing, data)) {
        showToastMessage("No changes detected", "info");
        return;
      }

      handleUpdateExpense(snapshot.editingId, data);
    }

    dispatch({ type: "RESET_FORM" });
    const succesMessage =
      snapshot.mode === "Add" ? "Expense added" : "Expense updated";
    showToastMessage(succesMessage, "success");
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
