import { useMemo } from "react";
import {
  getHighestExpense,
  getLowestExpense,
  getAverageExpense,
  totalCalculate,
} from "../utils/expenseDerive";

function useAnalytics(expenses, processedExpenses) {
  const overall = useMemo(() => {
    return {
      totalAmount: totalCalculate(expenses),
      highestExpense: getHighestExpense(expenses),
      lowestExpense: getLowestExpense(expenses),
      averageExpense: getAverageExpense(expenses),
      totalRecords: expenses.length,
    };
  }, [expenses]);

  const filtered = useMemo(() => {
    return {
      totalAmount: totalCalculate(processedExpenses),
      highestExpense: getHighestExpense(processedExpenses),
      lowestExpense: getLowestExpense(processedExpenses),
      averageExpense: getAverageExpense(processedExpenses),
      totalRecords: processedExpenses.length,
    };
  }, [processedExpenses]);

  return { overall, filtered };
}

export default useAnalytics;
