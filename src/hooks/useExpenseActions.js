import { useCallback } from "react";

function useExpenseActions({
  handleAddExpense,
  handleUpdateExpense,
  handleDeleteExpense,
  refreshAnalytics,
  refreshActivities,
  refreshCategories,
}) {
  const addExpenseWithRefresh = useCallback(
    async (...args) => {
      await handleAddExpense(...args);

      refreshAnalytics();
      refreshActivities();
      refreshCategories();
    },
    [handleAddExpense, refreshAnalytics, refreshActivities, refreshCategories],
  );

  const updateExpenseWithRefresh = useCallback(
    async (...args) => {
      await handleUpdateExpense(...args);

      refreshAnalytics();
      refreshActivities();
      refreshCategories();
    },
    [
      handleUpdateExpense,
      refreshAnalytics,
      refreshActivities,
      refreshCategories,
    ],
  );

  const deleteExpenseWithRefresh = useCallback(
    async (...args) => {
      await handleDeleteExpense(...args);

      refreshAnalytics();
      refreshActivities();
      refreshCategories();
    },
    [
      handleDeleteExpense,
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
