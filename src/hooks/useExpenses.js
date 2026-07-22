import { useState, useEffect, useCallback } from "react";

import {
  addExpense,
  updateExpense,
  deleteExpense,
  deleteSelectedExpenses,
  toggleSelectedExpense,
  selectAllExpenses,
  deselectAllExpenses,
  areAllSelected,
  areSomeSelected,
  getSelectedCount,
} from "../utils/expenseState";

import {
  getActivities,
  createActivity as createActivityApi,
} from "../services/activityApi";

import {
  getExpenses,
  createExpense,
  deleteExpense as deleteExpenseApi,
  updateExpense as updateExpenseApi,
  restoreExpense,
  clearAllExpenses,
} from "../services/expenseApi";

const MAX_ACTIVITIES = 10;

function useExpenses(showToastMessage, filters) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function loadActivities() {
      try {
        const data = await getActivities();
        setActivities(data);
      } catch (error) {
        console.error("Failed to load activities", error);
      }
    }

    loadActivities();
  }, []);

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [lastDeletedExpense, setLastDeletedExpense] = useState(null);

  const loadExpenses = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const data = await getExpenses({
        ...filters,
        page: 1,
        limit: 20,
      });

      setExpenses(data.expenses);
      setPagination(data.pagination);
      setPage(1);
    } catch (error) {
      console.error("Failed to load expenses", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const loadMoreExpenses = async () => {
    if (!pagination) return;

    if (page >= pagination.totalPages) return;

    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const data = await getExpenses({
        ...filters,
        page: nextPage,
        limit: 20,
      });

      setExpenses((prev) => [...prev, ...data.expenses]);

      setPagination(data.pagination);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to load more expenses", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const addActivity = async (type, message) => {
    try {
      const activity = await createActivityApi({
        type,
        message,
      });

      setActivities((prev) => [activity, ...prev].slice(0, MAX_ACTIVITIES));
    } catch (error) {
      console.error("Failed to create activity", error);
    }
  };

  const handleAddExpense = async (newExpense) => {
    try {
      const savedExpense = await createExpense(newExpense);

      setExpenses((prev) => addExpense(prev, savedExpense));
      addActivity("ADD_EXPENSE", `Added ${savedExpense.title}`);

      showToastMessage("Expense added", "success");
    } catch (error) {
      console.error("Failed to add expense", error);
      showToastMessage(error.message, "error");
    }
  };

  const handleUpdateExpense = async (id, updatedData) => {
    try {
      await updateExpenseApi({
        id,
        ...updatedData,
      });

      setExpenses((prev) => updateExpense(prev, id, updatedData));
      addActivity("UPDATE_EXPENSE", `Updated ${updatedData.title}`);

      showToastMessage("Expense updated", "success");
    } catch (error) {
      console.error("Failed to update expense", error);
      showToastMessage(error.message, "error");
    }
  };

  const handleUndoDelete = async () => {
    if (!lastDeletedExpense) return;

    try {
      const restoredExpense = await restoreExpense(lastDeletedExpense.id);

      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === restoredExpense.id ? restoredExpense : expense,
        ),
      );

      addActivity("RESTORE_EXPENSE", `Restored ${restoredExpense.title}`);

      setLastDeletedExpense(null);

      showToastMessage("Expense restored", "success");
    } catch (error) {
      console.error("Failed to restore expense", error);
      showToastMessage(error.message, "error");
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpenseApi(id);

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
    } catch (error) {
      console.error("Failed to delete expense", error);
      showToastMessage(error.message, "error");
    }
  };

  const handleToggleSelected = (id) => {
    setSelectedIds((prev) => toggleSelectedExpense(prev, id));
  };

  const handleSelectAll = () => {
    const activeExpenses = expenses.filter((expense) => !expense.deleted);

    setSelectedIds(selectAllExpenses(activeExpenses));
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

  const handleClearAllExpenses = async () => {
    try {
      await clearAllExpenses();

      setExpenses((prev) =>
        prev.map((expense) => ({
          ...expense,
          deleted: true,
        })),
      );

      setSelectedIds(new Set());

      showToastMessage("All expenses cleared", "success");
    } catch (error) {
      console.error("Failed to clear all expenses", error);
      showToastMessage(error.message, "error");
    }
  };

  const handleClearActivities = () => {
    setActivities([]);
  };

  const activeExpenses = expenses.filter((expense) => !expense.deleted);

  const selectedCount = getSelectedCount(selectedIds);
  const allSelected = areAllSelected(activeExpenses, selectedIds);
  const someSelected = areSomeSelected(activeExpenses, selectedIds);

  return {
    expenses,
    activities,
    loading,
    error,

    loadMoreExpenses,
    loadingMore,
    pagination,

    lastDeletedExpense,
    selectedIds,
    loadExpenses,
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
