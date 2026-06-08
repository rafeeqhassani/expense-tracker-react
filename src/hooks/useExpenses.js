import { useState, useEffect } from "react";

import { saveToLocalStorage, getFromLocalStorage } from "../utils/storage";
import {
  addExpense,
  updateExpense,
  deleteExpense,
  checkboxChange,
  clearSelectedExpenses,
} from "../utils/expenseState";

function useExpenses(showToastMessage) {
  const [expenses, setExpenses] = useState(() => {
    try {
      const stored = getFromLocalStorage("expenses");
      return Array.isArray(stored) ? stored : [];
    } catch (error) {
      console.error("Error loading expenses:", error);
      return [];
    }
  });

  useEffect(() => {
    saveToLocalStorage("expenses", expenses);
  }, [expenses]);

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => {
      const added = addExpense(prev, newExpense);

      return added;
    });
  };

  const handleUpdateExpense = (editingId, updatedData) =>
    setExpenses((prev) => updateExpense(prev, editingId, updatedData));

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => deleteExpense(prev, id));
    showToastMessage("Expense deleted", "success");
  };

  const handleCheckboxChange = (id, onCheckboxChange) => {
    setExpenses((prev) => checkboxChange(prev, id, onCheckboxChange));
  };

  const handleClearSelected = () =>
    setExpenses((prev) => clearSelectedExpenses(prev));

  const handleClearAll = () => {
    setExpenses([]);
  };

  return {
    expenses,
    handleAddExpense,
    handleDeleteExpense,
    handleUpdateExpense,
    handleCheckboxChange,
    handleClearSelected,
    handleClearAll,
  };
}
export default useExpenses;
