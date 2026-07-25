import { createContext, useCallback, useMemo, useState } from "react";

import useExpenses from "../hooks/useExpenses";
import useFilters from "../hooks/useFilters";
import useExpenseForm from "../hooks/useExpenseForm";
import useToast from "../hooks/useToast";
import useAnalytics from "../hooks/useAnalytics";
import useBudget from "../hooks/useBudget";
import useBudgetConfig from "../hooks/useBudgetConfig";
import useCategories from "../hooks/useCategories";
import useAuth from "../hooks/useAuth";

export const AppContext = createContext(null);

/**
 * Composes all app-level hooks (expenses, filters, form, analytics,
 * budget, categories, toast) into a single context value consumed
 * throughout the app.
 */
function AppProviders({ children }) {
  const [analyticsRefreshKey, setAnalyticsRefreshKey] = useState(0);
  const auth = useAuth();

  const { toast, showToastMessage } = useToast();
  const filters = useFilters([]);

  // --- Expenses ---
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

  // --- Analytics refresh wiring ---
  // Certain expense mutations should trigger an analytics refetch;
  // these wrappers run the original handler, then bump the refresh key.
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

  // --- Form ---
  const form = useExpenseForm({
    expenses: activeExpenses,
    handleAddExpense: addExpenseWithRefresh,
    handleUpdateExpense: updateExpenseWithRefresh,
    showToastMessage,
  });

  // --- Analytics ---
  const analytics = useAnalytics(showToastMessage, analyticsRefreshKey);

  // --- Budget ---
  const {
    budgetConfig,
    loading: budgetLoading,
    error: budgetError,
    loadBudget,
    resetBudgetConfig,
    updateMonthlyLimit,
    updateCategoryLimit,
  } = useBudgetConfig(showToastMessage);

  const budget = useBudget(activeExpenses, budgetConfig);

  const budgetDomain = {
    ...budget,
    loading: budgetLoading,
    error: budgetError,
    loadBudget,
  };

  // --- Categories ---
  const categories = useCategories();

  // --- Clear everything ---
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

  // --- Context value ---
  const value = useMemo(
    () => ({
      auth: {
        user: auth.user,
        token: auth.token,
        loading: auth.loading,
        login: auth.login,
        logout: auth.logout,
        loadCurrentUser: auth.loadCurrentUser,
      },

      expense: {
        expenses: activeExpenses,
        pagination,
        loadingMore,
        loadMoreExpenses,
        loading,
        error,
        loadExpenses,
      },

      activities,
      categories,
      filters: filters.filters,

      analytics,
      budget: budgetDomain,
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

        resetFilters: filters.resetFilters,
        hasActiveFilters: filters.hasActiveFilters,
      },
    }),
    [
      auth,
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
