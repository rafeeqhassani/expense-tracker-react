import { useMemo } from "react";
import {
  calculateTotalSpent,
  calculateCategorySpent,
  getBudgetStatus,
  getBudgetAlerts,
  getCategoryBudgetSummary,
  getMonthlyBudgetSummary,
} from "../utils/budgetDerive";
import { formatBudget } from "../utils/formatters";

function useBudget(expenses, budgetConfig) {
  const totalSpent = useMemo(() => calculateTotalSpent(expenses), [expenses]);

  const categorySpent = useMemo(
    () => calculateCategorySpent(expenses),
    [expenses],
  );

  const monthly = useMemo(() => {
    const status = getBudgetStatus(totalSpent, budgetConfig.monthlyLimit);
    return formatBudget({ ...status, spent: totalSpent });
  }, [totalSpent, budgetConfig.monthlyLimit]);

  const categoryNames = useMemo(
    () => Object.keys(categorySpent || {}),
    [categorySpent],
  );

  const { categories, categoryStatuses } = useMemo(() => {
    const formattedByCategory = {};
    const statusByCategory = {};

    categoryNames.forEach((category) => {
      const spent = categorySpent?.[category] ?? 0;
      const limit = budgetConfig.categoryLimits?.[category] ?? 0;
      const status = getBudgetStatus(spent, limit);

      statusByCategory[category] = status;
      formattedByCategory[category] = formatBudget({ ...status, spent });
    });

    return {
      categories: formattedByCategory,
      categoryStatuses: statusByCategory,
    };
  }, [categoryNames, categorySpent, budgetConfig.categoryLimits]);

  const alerts = useMemo(
    () => getBudgetAlerts(monthly, categoryStatuses),
    [monthly, categoryStatuses],
  );

  const categoryBudgetSummary = useMemo(
    () => getCategoryBudgetSummary(categoryStatuses),
    [categoryStatuses],
  );

  const monthlyBudgetSummary = useMemo(
    () => getMonthlyBudgetSummary(monthly),
    [monthly],
  );

  return {
    monthly,
    categories,
    alerts,
    categoryBudgetSummary,
    monthlyBudgetSummary,
  };
}

export default useBudget;
