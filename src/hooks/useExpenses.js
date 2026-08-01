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
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  restoreExpense,
  clearAllExpenses,
  deleteSelectedExpenses,
} from "../services/expenseApi";

const EXPENSES_PER_PAGE = 20;

/**
 *
 * Manages expenses, their pagination, selection state,
 * and expense-related actions.
 *
 *
 * @param {(message: string, type: "success" | "error") => void} showToastMessage
 * @param {object} filters - Active filter/sort criteria to apply when fetching expenses.
 */
function useExpenses(
  showToastMessage,
  filters,
  authLoading,
  token,
  addActivity,
) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [deletingId, setDeletingId] = useState(null);

  // --- Undo-delete state ---
  const [lastDeletedExpense, setLastDeletedExpense] = useState(null);

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

      setExpenses(data.expenses ?? []);
      setPagination(data.pagination ?? null);
      setPage(1);
      setSelectedIds(new Set());
    } catch (error) {
      console.error("Failed to load expenses", error);

      setExpenses([]);
      setPagination(null);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Reload expenses whenever the filters change.

  useEffect(() => {
    if (!token) {
      setExpenses([]);
      setPagination(null);
      setPage(1);
      setLoading(false);
      setLoadingMore(false);

      setSelectedIds(new Set());
      setLastDeletedExpense(null);
      setError(null);

      return;
    }

    if (authLoading) return;

    loadExpenses();
  }, [loadExpenses, authLoading, token]);

  /**
   * Fetches the next page of expenses (if any remain) and appends
   * them to the existing list.
   */
  const loadMoreExpenses = useCallback(async () => {
    if (loadingMore) return;
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

      setExpenses((prev) => [...prev, ...(data.expenses ?? [])]);
      setPagination(data.pagination ?? null);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to load more expenses", error);
      showToastMessage(error.message, "error");
    } finally {
      setLoadingMore(false);
    }
  }, [filters, loadingMore, pagination, page, showToastMessage]);

  const handleAddExpense = async (newExpense) => {
    try {
      const savedExpense = await createExpense(newExpense);

      await loadExpenses();

      await addActivity("ADD_EXPENSE", `Added ${savedExpense.title}`);

      showToastMessage("Expense added", "success");
    } catch (error) {
      console.error("Failed to add expense", error);
      showToastMessage(error.message, "error");
      throw error;
    }
  };

  const handleUpdateExpense = async (id, updatedData) => {
    try {
      await updateExpense({ id, ...updatedData });
      await loadExpenses();

      await addActivity("UPDATE_EXPENSE", `Updated ${updatedData.title}`);

      showToastMessage("Expense updated", "success");
    } catch (error) {
      console.error("Failed to update expense", error);
      showToastMessage(error.message, "error");
      throw error;
    }
  };

  const handleDeleteExpense = async (id) => {
    if (deletingId === id) return;

    try {
      setDeletingId(id);

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
        await addActivity("DELETE_EXPENSE", `Deleted ${deletedExpense.title}`);
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
      throw error;
    } finally {
      setDeletingId(null);
    }
  };

  const handleUndoDelete = async () => {
    if (!lastDeletedExpense) return;

    try {
      const restoredExpense = await restoreExpense(lastDeletedExpense.id);

      await loadExpenses();

      await addActivity("RESTORE_EXPENSE", `Restored ${restoredExpense.title}`);
      setLastDeletedExpense(null);

      showToastMessage("Expense restored", "success");
    } catch (error) {
      console.error("Failed to restore expense", error);
      showToastMessage(error.message, "error");
      throw error;
    }
  };

  const handleRemoveSelected = async () => {
    try {
      const idsToDelete = [...selectedIds];
      if (selectedIds.size === 0) return;

      await deleteSelectedExpenses(idsToDelete);

      await loadExpenses();

      setSelectedIds(new Set());

      showToastMessage("Selected expenses deleted", "success");
    } catch (error) {
      console.error("Failed to delete selected expenses", error);
      showToastMessage(error.message, "error");
      throw error;
    }
  };

  const handleClearAllExpenses = async () => {
    try {
      await clearAllExpenses();

      await loadExpenses();

      setSelectedIds(new Set());
    } catch (error) {
      console.error("Failed to clear all expenses", error);
      throw error;
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
