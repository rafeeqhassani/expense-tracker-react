import { createContext, useCallback, useMemo } from "react";

import useExpenses from "../hooks/useExpenses";
import useFilters from "../hooks/useFilters";
import useExpenseForm from "../hooks/useExpenseForm";
import useToast from "../hooks/useToast";
import useAnalytics from "../hooks/useAnalytics";
import useBudget from "../hooks/useBudget";
import useBudgetConfig from "../hooks/useBudgetConfig";

export const AppContext = createContext(null);

function AppProviders({ children }) {
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

  const analytics = useAnalytics(showToastMessage);

  const {
    budgetConfig,
    resetBudgetConfig,
    updateMonthlyLimit,
    updateCategoryLimit,
  } = useBudgetConfig(showToastMessage);

  const budget = useBudget(activeExpenses, budgetConfig);

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
        categories: filters.categories,

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
