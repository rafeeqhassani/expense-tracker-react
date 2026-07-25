import { useState, useEffect, useCallback } from "react";

import {
  toggleSelectedExpense,
  selectAllExpenses,
  deselectAllExpenses,
  areAllSelected,
  areSomeSelected,
  getSelectedCount,
} from "../utils/expenseState";

import {
  getActivities,
  createActivity,
  clearActivities as clearActivitiesApi,
} from "../services/activityApi";

import {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  restoreExpense,
  clearAllExpenses,
  deleteSelectedExpenses,
} from "../services/expenseApi";

const MAX_ACTIVITIES = 10;
const EXPENSES_PER_PAGE = 20;

/**
 * Manages expenses, their pagination, selection state, and the
 * related activity feed for the expense tracker.
 *
 * @param {(message: string, type: "success" | "error") => void} showToastMessage
 * @param {object} filters - Active filter/sort criteria to apply when fetching expenses.
 */
function useExpenses(showToastMessage, filters) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const [selectedIds, setSelectedIds] = useState(new Set());

  // --- Undo-delete state ---
  const [lastDeletedExpense, setLastDeletedExpense] = useState(null);

  // --- Activity feed state ---
  const [activities, setActivities] = useState([]);

  // Load the activity feed once on mount.
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

  /**
   * Fetches the first page of expenses matching the current filters,
   * replacing the existing list.
   */
  const loadExpenses = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const data = await getExpenses({
        ...filters,
        page: 1,
        limit: EXPENSES_PER_PAGE,
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

  // Reload expenses whenever the filters change.
  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  /**
   * Fetches the next page of expenses (if any remain) and appends
   * them to the existing list.
   */
  const loadMoreExpenses = async () => {
    if (!pagination) return;
    if (page >= pagination.totalPages) return;

    const nextPage = page + 1;

    try {
      setLoadingMore(true);

      const data = await getExpenses({
        ...filters,
        page: nextPage,
        limit: EXPENSES_PER_PAGE,
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

  /**
   * Records a new activity in the feed, keeping only the most
   * recent `MAX_ACTIVITIES` entries.
   */
  const addActivity = async (type, message) => {
    try {
      const activity = await createActivity({ type, message });

      setActivities((prev) => [activity, ...prev].slice(0, MAX_ACTIVITIES));
    } catch (error) {
      console.error("Failed to create activity", error);
    }
  };

  const handleAddExpense = async (newExpense) => {
    try {
      const savedExpense = await createExpense(newExpense);

      setExpenses((prev) => [...prev, savedExpense]);
      addActivity("ADD_EXPENSE", `Added ${savedExpense.title}`);

      showToastMessage("Expense added", "success");
    } catch (error) {
      console.error("Failed to add expense", error);
      showToastMessage(error.message, "error");
    }
  };

  const handleUpdateExpense = async (id, updatedData) => {
    try {
      await updateExpense({ id, ...updatedData });

      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === id ? { ...expense, ...updatedData } : expense,
        ),
      );
      addActivity("UPDATE_EXPENSE", `Updated ${updatedData.title}`);

      showToastMessage("Expense updated", "success");
    } catch (error) {
      console.error("Failed to update expense", error);
      showToastMessage(error.message, "error");
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);

      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === id ? { ...expense, deleted: true } : expense,
        ),
      );

      const deletedExpense =
        expenses.find((expense) => expense.id === id) ?? null;

      if (deletedExpense) {
        setLastDeletedExpense(deletedExpense);
        addActivity("DELETE_EXPENSE", `Deleted ${deletedExpense.title}`);
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

  const handleRemoveSelected = async () => {
    try {
      const idsToDelete = [...selectedIds];

      await deleteSelectedExpenses(idsToDelete);

      setExpenses((prev) =>
        prev.map((expense) =>
          selectedIds.has(expense.id) ? { ...expense, deleted: true } : expense,
        ),
      );

      setSelectedIds(new Set());

      showToastMessage("Selected expenses deleted", "success");
    } catch (error) {
      console.error("Failed to delete selected expenses", error);
      showToastMessage(error.message, "error");
    }
  };

  const handleClearAllExpenses = async () => {
    try {
      await clearAllExpenses();

      setExpenses((prev) =>
        prev.map((expense) => ({ ...expense, deleted: true })),
      );

      setSelectedIds(new Set());

      showToastMessage("All expenses cleared", "success");
    } catch (error) {
      console.error("Failed to clear all expenses", error);
      showToastMessage(error.message, "error");
    }
  };

  const handleClearActivities = async () => {
    try {
      const updatedActivities = await clearActivitiesApi();
      setActivities(updatedActivities);
    } catch (error) {
      console.error("Failed to clear activities", error);
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

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  // --- Derived values ---
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
