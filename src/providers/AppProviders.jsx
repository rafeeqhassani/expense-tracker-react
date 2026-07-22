import { createContext, useCallback, useMemo, useState } from "react";
import { getUniqueCategories } from "../utils/expenseDerive";

import useExpenses from "../hooks/useExpenses";
import useFilters from "../hooks/useFilters";
import useExpenseForm from "../hooks/useExpenseForm";
import useToast from "../hooks/useToast";
import useAnalytics from "../hooks/useAnalytics";
import useBudget from "../hooks/useBudget";
import useBudgetConfig from "../hooks/useBudgetConfig";
import useCategories from "../hooks/useCategories";

export const AppContext = createContext(null);

function AppProviders({ children }) {
  const [analyticsRefreshKey, setAnalyticsRefreshKey] = useState(0);

  const { toast, showToastMessage } = useToast();
  const filters = useFilters([]);

  const {
    expenses,
    activities,
    loading,
    error,

    loadingMore,
    pagination,

    selectedIds,
    lastDeletedExpense,
    loadExpenses,
    loadMoreExpenses,
    handleAddExpense,
    handleUpdateExpense,
    handleUndoDelete,
    handleDeleteExpense,
    handleToggleSelected,
    handleSelectAll,
    handleDeselectAll,
    handleRemoveSelected,
    handleClearSelection,
    handleClearAllExpenses,
    handleClearActivities,
    allSelected,
    someSelected,
    selectedCount,
  } = useExpenses(showToastMessage, filters.filters);

  const refreshAnalytics = useCallback(() => {
    setAnalyticsRefreshKey((prev) => prev + 1);
  }, []);

  const addExpenseWithRefresh = useCallback(
    async (...args) => {
      await handleAddExpense(...args);
      refreshAnalytics();
    },
    [handleAddExpense, refreshAnalytics],
  );

  const updateExpenseWithRefresh = useCallback(
    async (...args) => {
      await handleUpdateExpense(...args);
      refreshAnalytics();
    },
    [handleUpdateExpense, refreshAnalytics],
  );

  const deleteExpenseWithRefresh = useCallback(
    async (...args) => {
      await handleDeleteExpense(...args);
      refreshAnalytics();
    },
    [handleDeleteExpense, refreshAnalytics],
  );

  const activeExpenses = useMemo(
    () =>
      Array.isArray(expenses)
        ? expenses.filter((expense) => !expense.deleted)
        : [],
    [expenses],
  );

  const form = useExpenseForm({
    expenses: activeExpenses,
    handleAddExpense,
    handleUpdateExpense,
    showToastMessage,
  });

  const analytics = useAnalytics(showToastMessage, analyticsRefreshKey);

  const {
    budgetConfig,
    resetBudgetConfig,
    updateMonthlyLimit,
    updateCategoryLimit,
  } = useBudgetConfig(showToastMessage);

  const budget = useBudget(activeExpenses, budgetConfig);
  const categories = useCategories();

  const clearAll = useCallback(() => {
    handleClearSelection();
    handleClearAllExpenses();
    handleClearActivities();
    resetBudgetConfig();
    showToastMessage("All data cleared", "success");
  }, [
    handleClearSelection,
    handleClearAllExpenses,
    handleClearActivities,
    resetBudgetConfig,
    showToastMessage,
  ]);

  const value = useMemo(
    () => ({
      data: {
        displayedExpenses: activeExpenses,
        categories: categories,

        pagination,
        loadingMore,
        loadMoreExpenses,

        filters: filters.filters,
        activities,
        loading,
        error,
        loadExpenses,
      },

      analytics,
      budget,
      budgetConfig,
      updateMonthlyLimit,
      updateCategoryLimit,

      form: {
        formData: form.formData,
        mode: form.mode,
        isFormOpen: form.isFormOpen,
        errors: form.errors,
        touched: form.touched,
        submitAttempted: form.submitAttempted,
      },

      toast,

      actions: {
        openForm: form.openForm,
        closeForm: form.closeForm,
        handleEditExpense: form.handleEditExpense,
        handleSubmit: form.handleSubmit,
        handleChange: form.handleChange,

        handleAddExpense: addExpenseWithRefresh,
        handleUpdateExpense: updateExpenseWithRefresh,
        handleDeleteExpense: deleteExpenseWithRefresh,
        handleUndoDelete,

        selectedIds,
        lastDeletedExpense,
        handleToggleSelected,
        handleSelectAll,
        handleDeselectAll,
        handleRemoveSelected,
        handleClearSelection,
        selectedCount,
        allSelected,
        someSelected,
        handleClearAll: clearAll,

        handleFilterChange: filters.handleFilterChange,
        setFilters: filters.setFilters,
        resetFilters: filters.resetFilters,
        hasActiveFilters: filters.hasActiveFilters,
      },
    }),
    [
      filters,
      activities,
      analytics,
      budget,
      budgetConfig,
      updateMonthlyLimit,
      updateCategoryLimit,
      form,
      toast,
      handleAddExpense,
      handleUpdateExpense,
      handleUndoDelete,
      handleDeleteExpense,
      selectedIds,
      lastDeletedExpense,
      handleToggleSelected,
      handleSelectAll,
      handleDeselectAll,
      handleRemoveSelected,
      handleClearSelection,
      selectedCount,
      allSelected,
      someSelected,
      clearAll,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProviders;
