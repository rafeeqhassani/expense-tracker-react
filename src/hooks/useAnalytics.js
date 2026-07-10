import { useMemo } from "react";
import {
  getHighestExpense,
  getLowestExpense,
  getAverageExpense,
  totalCalculate,
  getAverageDailySpending,
  getExpensesToday,
  getExpensesThisWeek,
  getExpensesThisMonth,
  getTotalCategories,
  getExpensesThisYear,
} from "../utils/expenseDerive";

/**
 * Computes the summary stats shown for a given expense list (used for both
 * the "overall" — unfiltered — and "filtered" — post-search/filter — views).
 */
function computeSummary(expenses) {
  return {
    totalAmount: totalCalculate(expenses),
    highestExpense: getHighestExpense(expenses),
    lowestExpense: getLowestExpense(expenses),
    averageExpense: getAverageExpense(expenses),
    averageDailySpending: getAverageDailySpending(expenses),
    totalRecords: expenses.length,
  };
}

function useAnalytics(expenses, processedExpenses) {
  const overall = useMemo(() => computeSummary(expenses), [expenses]);

  const filtered = useMemo(
    () => computeSummary(processedExpenses),
    [processedExpenses],
  );

  const dashboard = useMemo(() => {
    return {
      expensesToday: getExpensesToday(expenses),
      expensesThisWeek: getExpensesThisWeek(expenses),
      expensesThisMonth: getExpensesThisMonth(expenses),
      expensesThisYear: getExpensesThisYear(expenses),
      totalCategories: getTotalCategories(expenses),
    };
  }, [expenses]);

  return { overall, filtered, dashboard };
}

export default useAnalytics;
