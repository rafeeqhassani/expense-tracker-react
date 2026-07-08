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

import { createActivity } from "../utils/activity";

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

  const [activities, setActivities] = useState(() => {
    try {
      const stored = getFromLocalStorage("activities");
      return Array.isArray(stored) ? stored : [];
    } catch (error) {
      console.error("Error loading activities:", error);
      return [];
    }
  });

  useEffect(() => {
    saveToLocalStorage("expenses", expenses);
  }, [expenses]);

  useEffect(() => {
    saveToLocalStorage("activities", activities);
  }, [activities]);

  const [selectedIds, setSelectedIds] = useState(() => new Set());

  const [lastDeletedExpense, setLastDeletedExpense] = useState(null);

  const addActivity = (type, message) => {
    const activity = createActivity(type, message);

    setActivities((prev) => [activity, ...prev]);
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => addExpense(prev, newExpense));

    addActivity("ADD_EXPENSE", `Added ${newExpense.title}`);
  };

  const handleUpdateExpense = (editingId, updatedData) => {
    setExpenses((prev) => updateExpense(prev, editingId, updatedData));

    addActivity("UPDATE_EXPENSE", `Updated ${updatedData.title}`);
  };

  const handleUndoDelete = () => {
    if (!lastDeletedExpense) return;

    const expenseToRestore = lastDeletedExpense;

    setExpenses((prev) => restoreExpense(prev, expenseToRestore));

    addActivity("RESTORE_EXPENSE", `Restored ${expenseToRestore.title}`);

    setLastDeletedExpense(null);
  };

  const handleDeleteExpense = (id) => {
    const { updatedExpenses, deletedItem } = deleteExpense(expenses, id);

    setExpenses(updatedExpenses);

    if (deletedItem) {
      setLastDeletedExpense(deletedItem);

      addActivity("DELETE_EXPENSE", `Deleted ${deletedItem.title}`);
    }

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

  const clearAllRecent = () => {
    setActivities([]);
  };

  const selectedCount = getSelectedCount(selectedIds);
  const allSelected = areAllSelected(expenses, selectedIds);
  const someSelected = areSomeSelected(expenses, selectedIds);

  useRecurring(expenses, setExpenses);

  return {
    expenses,
    activities,

    lastDeletedExpense,
    selectedIds,
    handleToggleSelected,
    handleSelectAll,
    handleDeselectAll,
    handleRemoveSelected,
    handleClearSelection,
    handleClearAllExpenses,
    clearAllRecent,

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
