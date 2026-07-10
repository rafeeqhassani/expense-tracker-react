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

const MAX_ACTIVITIES = 10;

function useExpenses(showToastMessage) {
  const [expenses, setExpenses] = useState(() =>
    getFromLocalStorage("expenses"),
  );
  const [activities, setActivities] = useState(() =>
    getFromLocalStorage("activities"),
  );

  useEffect(() => {
    saveToLocalStorage("expenses", expenses);
  }, [expenses]);

  useEffect(() => {
    saveToLocalStorage("activities", activities);
  }, [activities]);

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [lastDeletedExpense, setLastDeletedExpense] = useState(null);

  const addActivity = (type, message) => {
    const activity = createActivity(type, message);
    setActivities((prev) => [activity, ...prev].slice(0, MAX_ACTIVITIES));
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => addExpense(prev, newExpense));
    addActivity("ADD_EXPENSE", `Added ${newExpense.title}`);
  };

  const handleUpdateExpense = (id, updatedData) => {
    setExpenses((prev) => updateExpense(prev, id, updatedData));
    addActivity("UPDATE_EXPENSE", `Updated ${updatedData.title}`);
  };

  const handleUndoDelete = () => {
    if (!lastDeletedExpense) return;

    setExpenses((prev) => restoreExpense(prev, lastDeletedExpense));
    addActivity("RESTORE_EXPENSE", `Restored ${lastDeletedExpense.title}`);
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
      const nextSelectedIds = new Set(prev);
      nextSelectedIds.delete(id);
      return nextSelectedIds;
    });

    showToastMessage("Expense deleted", "success");
  };

  const handleToggleSelected = (id) => {
    setSelectedIds((prev) => toggleSelectedExpense(prev, id));
  };

  const handleSelectAll = () => {
    setSelectedIds(
      selectAllExpenses(expenses.filter((expense) => !expense.deleted)),
    );
  };

  const handleDeselectAll = () => {
    setSelectedIds(deselectAllExpenses());
  };

  const handleRemoveSelected = () => {
    setExpenses((prev) => deleteSelectedExpenses(prev, selectedIds));
    setSelectedIds(new Set());
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleClearAllExpenses = () => {
    setExpenses([]);
  };

  const handleClearActivities = () => {
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
    handleClearActivities,

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
