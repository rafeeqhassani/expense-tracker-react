import { useMemo } from "react";
import {
  calculateTotalSpent,
  calculateCategorySpent,
  getBudgetStatus,
  getBudgetAlerts,
} from "../utils/budgetDerive";
import { formatBudget } from "../utils/expenseTransform";

function useBudget(expenses, budgetConfig) {
  const totalSpent = useMemo(() => {
    return calculateTotalSpent(expenses);
  }, [expenses]);

  const categorySpent = useMemo(() => {
    return calculateCategorySpent(expenses);
  }, [expenses]);

  const monthly = useMemo(() => {
    const status = getBudgetStatus(totalSpent, budgetConfig.monthlyLimit);

    return formatBudget({
      ...status,
      spent: totalSpent,
    });
  }, [totalSpent, budgetConfig.monthlyLimit]);

  const allCategories = useMemo(() => {
    return Object.keys(categorySpent || {});
  }, [categorySpent]);

  const categories = useMemo(() => {
    const result = {};

    allCategories.forEach((category) => {
      const spent = categorySpent?.[category] ?? 0;
      const limit = budgetConfig.categoryLimits?.[category] ?? 0;

      const status = getBudgetStatus(spent, limit);

      result[category] = formatBudget({
        ...status,
        spent,
      });
    });

    return result;
  }, [allCategories, categorySpent, budgetConfig.categoryLimits]);

  const categoryStatuses = useMemo(() => {
    const result = {};

    allCategories.forEach((category) => {
      const spent = categorySpent?.[category] ?? 0;
      const limit = budgetConfig.categoryLimits?.[category] ?? 0;

      result[category] = getBudgetStatus(spent, limit);
    });

    return result;
  }, [allCategories, categorySpent, budgetConfig.categoryLimits]);

  const alerts = useMemo(() => {
    return getBudgetAlerts(monthly, categoryStatuses);
  }, [monthly, categoryStatuses]);

  return {
    monthly,
    categories,
    alerts,
  };
}

export default useBudget;
