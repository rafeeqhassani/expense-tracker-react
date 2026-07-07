import { useState, useEffect } from "react";

import { saveToLocalStorage, getFromLocalStorage } from "../utils/storage";
import {
  addExpense,
  updateExpense,
  deleteExpense,
  restoreExpense,
  deleteSelectedExpenses,
  toggleSelectedExpense,
  selectAllExpenses,
  deselectAllExpenses,
  areAllSelected,
  areSomeSelected,
  getSelectedCount,
} from "../utils/expenseState";

import useRecurring from "./useRecurring";

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

  const [selectedIds, setSelectedIds] = useState(() => new Set());

  const [lastDeletedExpense, setLastDeletedExpense] = useState(null);

  useEffect(() => {
    saveToLocalStorage("expenses", expenses);
  }, [expenses]);

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => addExpense(prev, newExpense));
  };

  const handleUpdateExpense = (editingId, updatedData) => {
    setExpenses((prev) => updateExpense(prev, editingId, updatedData));
  };

  const handleUndoDelete = () => {
    if (!lastDeletedExpense) return;

    const expenseToRestore = lastDeletedExpense;

    setExpenses((prev) => restoreExpense(prev, expenseToRestore));

    setLastDeletedExpense(null);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => {
      const { updatedExpenses, deletedItem } = deleteExpense(prev, id);

      setLastDeletedExpense(deletedItem);
      return updatedExpenses;
    });
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    showToastMessage("Expense deleted", "success");
  };

  const handleToggleSelected = (id) => {
    setSelectedIds((prev) => toggleSelectedExpense(prev, id));
  };

  const handleSelectAll = () => {
    setSelectedIds(() => selectAllExpenses(expenses.filter((e) => !e.deleted)));
  };

  const handleDeselectAll = () => {
    setSelectedIds(() => deselectAllExpenses());
  };

  const handleRemoveSelected = () => {
    setExpenses((prev) => deleteSelectedExpenses(prev, selectedIds));

    setSelectedIds(() => new Set());
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleClearAllExpenses = () => {
    setExpenses([]);
  };

  const selectedCount = getSelectedCount(selectedIds);
  const allSelected = areAllSelected(expenses, selectedIds);
  const someSelected = areSomeSelected(expenses, selectedIds);

  useRecurring(expenses, setExpenses);

  return {
    expenses,
    lastDeletedExpense,
    selectedIds,
    handleToggleSelected,
    handleSelectAll,
    handleDeselectAll,
    handleRemoveSelected,
    handleClearSelection,
    handleClearAllExpenses,

    handleAddExpense,
    handleUndoDelete,
    handleDeleteExpense,
    handleUpdateExpense,

    allSelected,
    someSelected,
    selectedCount,
  };
}

export default useExpenses;
