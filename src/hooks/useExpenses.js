import { useState, useEffect } from "react";

import { saveToLocalStorage, getFromLocalStorage } from "../utils/storage";
import {
  addExpense,
  updateExpense,
  deleteExpense,
  clearSelectedExpenses,
  toggleSelectedExpense,
  selectedAllExpenses,
  deselectAllExpenses,
  areAllSelected,
  areSomeSelected,
  getSelectedCount,
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

  const handleToggleSelected = (id) => {
    setExpenses((prev) => toggleSelectedExpense(prev, id));
  };

  const selectedCount = getSelectedCount(expenses);

  const allSelected = areAllSelected(expenses);
  const someSelected = areSomeSelected(expenses);

  const handleSelectAll = () =>
    setExpenses((prev) => selectedAllExpenses(prev));

  const handleDeselectAll = () =>
    setExpenses((prev) => deselectAllExpenses(prev));

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
    handleToggleSelected,
    allSelected,
    someSelected,
    selectedCount,
    handleSelectAll,
    handleDeselectAll,
    handleClearSelected,
    handleClearAll,
  };
}
export default useExpenses;
