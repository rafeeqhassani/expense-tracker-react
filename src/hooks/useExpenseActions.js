import { useCallback } from "react";

function useExpenseActions({
  handleAddExpense,
  handleUpdateExpense,
  handleDeleteExpense,
  loadExpenses,

  refreshAnalytics,
  refreshActivities,
  refreshCategories,
}) {
  const addExpenseWithRefresh = useCallback(
    async (...args) => {
      await handleAddExpense(...args);
      await loadExpenses();

      refreshAnalytics();
      refreshActivities();
      refreshCategories();
    },
    [
      handleAddExpense,
      loadExpenses,
      refreshAnalytics,
      refreshActivities,
      refreshCategories,
    ],
  );

  const updateExpenseWithRefresh = useCallback(
    async (...args) => {
      await handleUpdateExpense(...args);
      await loadExpenses();

      refreshAnalytics();
      refreshActivities();
      refreshCategories();
    },
    [
      handleUpdateExpense,
      loadExpenses,
      refreshAnalytics,
      refreshActivities,
      refreshCategories,
    ],
  );

  const deleteExpenseWithRefresh = useCallback(
    async (...args) => {
      await handleDeleteExpense(...args);
      await loadExpenses();

      refreshAnalytics();
      refreshActivities();
      refreshCategories();
    },
    [
      handleDeleteExpense,
      loadExpenses,
      refreshAnalytics,
      refreshActivities,
      refreshCategories,
    ],
  );

  return {
    addExpenseWithRefresh,
    updateExpenseWithRefresh,
    deleteExpenseWithRefresh,
  };
}

export default useExpenseActions;
