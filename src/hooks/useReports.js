import { useMemo } from "react";
import {
  getHighestExpense,
  getLowestExpense,
  getAverageExpense,
  totalCalculate,
} from "../utils/expenseDerive";
function useReports(expenses, processedExpenses) {
  const overallTotal = useMemo(() => totalCalculate(expenses), [expenses]);
  const overallHighest = useMemo(() => getHighestExpense(expenses), [expenses]);
  const overallLowest = useMemo(() => getLowestExpense(expenses), [expenses]);
  const overallAverage = useMemo(() => getAverageExpense(expenses), [expenses]);

  const filteredTotal = useMemo(
    () => totalCalculate(processedExpenses),
    [processedExpenses],
  );
  const filteredHighest = useMemo(
    () => getHighestExpense(processedExpenses),
    [processedExpenses],
  );
  const filteredLowest = useMemo(
    () => getLowestExpense(processedExpenses),
    [processedExpenses],
  );
  const filteredAverage = useMemo(
    () => getAverageExpense(processedExpenses),
    [processedExpenses],
  );

  return {
    overall: {
      total: overallTotal,
      highest: overallHighest,
      lowest: overallLowest,
      average: overallAverage,
      records: expenses.length,
    },
    filtered: {
      total: filteredTotal,
      highest: filteredHighest,
      lowest: filteredLowest,
      average: filteredAverage,
      records: processedExpenses.length,
    },
  };
}
export default useReports;
