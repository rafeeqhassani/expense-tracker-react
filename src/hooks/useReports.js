import { useMemo } from "react";
import {
  getHighestExpense,
  getLowestExpense,
  getAverageExpense,
  totalCalculate,
  getMonthlyExpenses,
} from "../utils/expenseDerive";

function useReports(expenses, processedExpenses) {
  const highestExpense = useMemo(() => getHighestExpense(expenses), [expenses]);

  const lowestExpense = useMemo(() => getLowestExpense(expenses), [expenses]);

  const averageExpense = useMemo(() => getAverageExpense(expenses), [expenses]);
  const monthlyTotal = useMemo(
    () => totalCalculate(getMonthlyExpenses(expenses)),
    [expenses],
  );

  const totalExpenses = useMemo(() => totalCalculate(expenses), [expenses]);

  const totalRecords = expenses.length;

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

  const filteredMonthlyTotal = useMemo(
    () => totalCalculate(getMonthlyExpenses(processedExpenses)),
    [processedExpenses],
  );

  const filteredTotal = useMemo(
    () => totalCalculate(processedExpenses),
    [processedExpenses],
  );

  const filteredRecords = processedExpenses.length;

  return {
    highestExpense,
    lowestExpense,
    averageExpense,
    monthlyTotal,
    totalExpenses,
    totalRecords,
    filteredHighest,
    filteredLowest,
    filteredAverage,
    filteredMonthlyTotal,
    filteredTotal,
    filteredRecords,
  };
}

export default useReports;
