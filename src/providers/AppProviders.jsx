import { createContext, useCallback, useMemo } from "react";

import useExpenses from "../hooks/useExpenses";
import useFilters from "../hooks/useFilters";
import useExpenseForm from "../hooks/useExpenseForm";
import useToast from "../hooks/useToast";
import useAnalytics from "../hooks/useAnalytics";
import useBudget from "../hooks/useBudget";
import useBudgetConfig from "../hooks/useBudgetConfig";
import useCategories from "../hooks/useCategories";
import useAuth from "../hooks/useAuth";
import useDebounce from "../hooks/useDebounce";
import useActivities from "../hooks/useActivities";
import useActivityPreview from "../hooks/useActivityPreview";
import useAnalyticsRefresh from "../hooks/refresh/useAnalyticsRefresh";
import useExpenseActions from "../hooks/useExpenseActions";
import useActivityRefresh from "../hooks/refresh/useActivityRefresh";
import useCategoryAnalytics from "../hooks/useCategoryAnalytics";
import useCategoriesRefresh from "../hooks/refresh/useCategoriesRefresh";

export const AppContext = createContext(null);

/**
 * Composes all app-level hooks (expenses, filters, form, analytics,
 * budget, categories, toast) into a single context value consumed
 * throughout the app.
 */
function AppProviders({ children }) {
  const auth = useAuth();

  const { toast, showToastMessage } = useToast();
  const filters = useFilters([]);
  const debouncedFilters = useDebounce(filters.filters, 400);

  const { refreshKey: activityRefreshKey, refreshActivities } =
    useActivityRefresh();

  const activities = useActivities(
    activityRefreshKey,
    auth.loading,
    auth.token,
  );
  const { handleClearActivities } = activities;

  const {
    expenses,
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

    allSelected,
    someSelected,
    selectedCount,
  } = useExpenses(
    showToastMessage,
    debouncedFilters,
    auth.loading,
    auth.token,
    activities.addActivity,
  );

  const activeExpenses = useMemo(
    () =>
      Array.isArray(expenses)
        ? expenses.filter((expense) => !expense.deleted)
        : [],
    [expenses],
  );

  const activityPreview = useActivityPreview(
    activityRefreshKey,
    auth.loading,
    auth.token,
  );

  const { refreshKey: analyticsRefreshKey, refreshAnalytics } =
    useAnalyticsRefresh();

  const analytics = useAnalytics(analyticsRefreshKey, auth.loading, auth.token);

  const { refreshKey: categoriesRefreshKey, refreshCategories } =
    useCategoriesRefresh();

  const categories = useCategories(
    categoriesRefreshKey,
    auth.loading,
    auth.token,
  );
  const categoryAnalytics = useCategoryAnalytics(
    categoriesRefreshKey,
    auth.loading,
    auth.token,
  );

  const {
    addExpenseWithRefresh,
    updateExpenseWithRefresh,
    deleteExpenseWithRefresh,
  } = useExpenseActions({
    handleAddExpense,
    handleUpdateExpense,
    handleDeleteExpense,
    refreshAnalytics,
    refreshActivities,
    refreshCategories,
  });

  const form = useExpenseForm({
    expenses: activeExpenses,
    handleAddExpense: addExpenseWithRefresh,
    handleUpdateExpense: updateExpenseWithRefresh,
    showToastMessage,
  });

  // --- Budget ---
  const {
    budgetConfig,
    loading: budgetLoading,
    error: budgetError,
    loadBudget,
    resetBudgetConfig,
    updateMonthlyLimit,
    updateCategoryLimit,
    saveBudgetConfig,
  } = useBudgetConfig(showToastMessage, auth.loading, auth.token);

  const budget = useBudget(activeExpenses, budgetConfig);

  const budgetDomain = {
    ...budget,
    loading: budgetLoading,
    error: budgetError,
    loadBudget,
  };

  const clearAll = useCallback(async () => {
    await handleClearSelection();

    await handleClearAllExpenses();

    await handleClearActivities();

    resetBudgetConfig();

    refreshAnalytics();
    refreshActivities();
    refreshCategories();

    showToastMessage("All data cleared", "success");
  }, [
    handleClearSelection,
    handleClearAllExpenses,
    handleClearActivities,
    resetBudgetConfig,
    refreshAnalytics,
    refreshActivities,
    showToastMessage,
  ]);

  // --- Context value ---
  const value = useMemo(
    () => ({
      auth: {
        user: auth.user,
        token: auth.token,
        loading: auth.loading,
        initializing: auth.initializing,
        error: auth.error,

        login: auth.login,
        register: auth.register,
        demoLogin: auth.demoLogin,
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

      activity: activities,
      activityPreview,
      categories,
      filters: filters.filters,

      analytics,
      categoryAnalytics,
      budget: budgetDomain,
      budgetConfig,
      updateMonthlyLimit,
      updateCategoryLimit,
      saveBudgetConfig,

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
      categoryAnalytics,
      categories,
      budget,
      budgetConfig,
      updateMonthlyLimit,
      updateCategoryLimit,
      form,
      toast,
      activityPreview,
      refreshActivities,
      deleteExpenseWithRefresh,
      handleUndoDelete,

      selectedIds,
      lastDeletedExpense,

      loadingMore,
      loading,
      error,
      pagination,
      loadExpenses,
      loadMoreExpenses,
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
