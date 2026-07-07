import { useMemo } from "react";
import {
  getHighestExpense,
  getLowestExpense,
  getAverageExpense,
  totalCalculate,
  getAverageDailySpending,
} from "../utils/expenseDerive";

import {
  getExpensesToday,
  getExpensesThisWeek,
  getExpensesThisMonth,
  getTotalCategories,
} from "../utils/expenseDerive";

function useAnalytics(expenses, processedExpenses) {
  const overall = useMemo(() => {
    return {
      totalAmount: totalCalculate(expenses),
      highestExpense: getHighestExpense(expenses),
      lowestExpense: getLowestExpense(expenses),
      averageExpense: getAverageExpense(expenses),
      averageDailySpending: getAverageDailySpending(expenses),

      totalRecords: expenses.length,
    };
  }, [expenses]);

  const filtered = useMemo(() => {
    return {
      totalAmount: totalCalculate(processedExpenses),
      highestExpense: getHighestExpense(processedExpenses),
      lowestExpense: getLowestExpense(processedExpenses),
      averageExpense: getAverageExpense(processedExpenses),
      averageDailySpending: getAverageDailySpending(processedExpenses),
      totalRecords: processedExpenses.length,
    };
  }, [processedExpenses]);

  const dashboard = useMemo(() => {
    return {
      expensesToday: getExpensesToday(expenses),
      expensesThisWeek: getExpensesThisWeek(expenses),
      expensesThisMonth: getExpensesThisMonth(expenses),
      expensesThisYear: getExpensesThisMonth(expenses),
      totalCategories: getTotalCategories(expenses),
    };
  }, [expenses]);

  return { overall, filtered, dashboard };
}

export default useAnalytics;
