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

  const expense = useExpenses(
    showToastMessage,
    debouncedFilters,
    auth.loading,
    auth.token,
    activities.addActivity,
  );

  const activeExpenses = useMemo(
    () =>
      Array.isArray(expense.expenses)
        ? expense.expenses.filter((item) => !item.deleted)
        : [],
    [expense.expenses],
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

  const expenseActions = useExpenseActions({
    handleAddExpense: expense.handleAddExpense,
    handleUpdateExpense: expense.handleUpdateExpense,
    handleDeleteExpense: expense.handleDeleteExpense,
    loadExpenses: expense.loadExpenses,

    refreshAnalytics,
    refreshActivities,
    refreshCategories,
  });

  const form = useExpenseForm({
    expenses: activeExpenses,
    handleAddExpense: expenseActions.addExpenseWithRefresh,
    handleUpdateExpense: expenseActions.updateExpenseWithRefresh,
    showToastMessage,
  });

  const budgetConfigState = useBudgetConfig(
    showToastMessage,
    auth.loading,
    auth.token,
  );

  const budget = useBudget(activeExpenses, budgetConfigState.budgetConfig);

  const budgetDomain = {
    ...budget,
    loading: budgetConfigState.loading,
    error: budgetConfigState.error,
    loadBudget: budgetConfigState.loadBudget,
  };

  const clearAll = useCallback(async () => {
    try {
      expense.handleClearSelection();

      await expense.handleClearAllExpenses();

      await handleClearActivities();

      await budgetConfigState.resetBudgetConfig();

      refreshAnalytics();
      refreshActivities();
      refreshCategories();

      showToastMessage("All data cleared", "success");
    } catch (error) {
      console.error("Failed to clear all data", error);
      showToastMessage(error.message, "error");
    }
  }, [
    expense.handleClearSelection,
    expense.handleClearAllExpenses,
    handleClearActivities,
    budgetConfigState.resetBudgetConfig,
    refreshAnalytics,
    refreshActivities,
    refreshCategories,
    showToastMessage,
  ]);

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
        pagination: expense.pagination,
        loadingMore: expense.loadingMore,

        loading: expense.loading,
        error: expense.error,
      },

      activity: {
        activities: activities.activities,
        loading: activities.loading,
        error: activities.error,
        loadingMore: activities.loadingMore,
        pagination: activities.pagination,
      },

      activityPreview,

      category: {
        categories: categories.categories,
        loading: categories.loading,
        error: categories.error,
        loadCategories: categories.loadCategories,
      },
      filters: filters.filters,

      analytics,
      categoryAnalytics,
      budget: budgetDomain,
      budgetConfig: budgetConfigState.budgetConfig,

      form: {
        formData: form.formData,
        mode: form.mode,
        isFormOpen: form.isFormOpen,
        errors: form.errors,
        touched: form.touched,
        submitAttempted: form.submitAttempted,
        submitting: form.submitting,
      },

      toast,

      actions: {
        openForm: form.openForm,
        closeForm: form.closeForm,
        handleEditExpense: form.handleEditExpense,
        handleSubmit: form.handleSubmit,
        handleChange: form.handleChange,

        handleDeleteExpense: expenseActions.deleteExpenseWithRefresh,
        handleUndoDelete: expense.handleUndoDelete,
        loadMoreExpenses: expense.loadMoreExpenses,
        loadExpenses: expense.loadExpenses,
        selectedIds: expense.selectedIds,
        lastDeletedExpense: expense.lastDeletedExpense,
        handleToggleSelected: expense.handleToggleSelected,
        handleSelectAll: expense.handleSelectAll,
        handleDeselectAll: expense.handleDeselectAll,
        handleRemoveSelected: expense.handleRemoveSelected,
        handleClearSelection: expense.handleClearSelection,
        selectedCount: expense.selectedCount,
        allSelected: expense.allSelected,
        someSelected: expense.someSelected,
        handleClearAll: clearAll,

        handleClearActivities: activities.handleClearActivities,
        loadActivities: activities.loadActivities,
        loadMoreActivities: activities.loadMoreActivities,

        handleFilterChange: filters.handleFilterChange,
        resetFilters: filters.resetFilters,
        hasActiveFilters: filters.hasActiveFilters,

        updateMonthlyLimit: budgetConfigState.updateMonthlyLimit,
        updateCategoryLimit: budgetConfigState.updateCategoryLimit,
        saveBudgetConfig: budgetConfigState.saveBudgetConfig,
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
      budgetConfigState,
      form,
      toast,
      activityPreview,
      expenseActions,
      expense,
      clearAll,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProviders;
