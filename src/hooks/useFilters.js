import { useState, useEffect, useMemo, useCallback } from "react";
import {
  filterByMonth,
  sortExpenses,
  searchExpenses,
  filterByDateRange,
  totalCalculate,
  getUniqueCategories,
} from "../utils/expenseDerive";

import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage";

const initialFilters = {
  title: "",
  month: "all",
  startDate: "",
  endDate: "",
  sortBy: "smallest",
};

function useFilters(expenses) {
  const [filters, setFilters] = useState(initialFilters);

  const [visibleCount, setVisibleCount] = useState(() => {
    const stored = Number(getFromLocalStorage("visibleCount"));
    return stored > 0 ? stored : 40;
  });

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const pipeline = useMemo(
    () => [
      {
        fn: searchExpenses,
        shouldRun: (filters) => filters.title.trim().length > 0,
      },
      {
        fn: filterByMonth,
        shouldRun: (filters) => filters.month !== "all",
      },
      {
        fn: filterByDateRange,
        shouldRun: (filters) => filters.startDate || filters.endDate,
      },
      {
        fn: sortExpenses,
        shouldRun: () => true,
      },
    ],
    [],
  );

  const applyPipeline = useCallback(
    (expenses, filters) => {
      return pipeline.reduce((result, step) => {
        if (!step.shouldRun(filters)) return result;

        const output = step.fn(result, filters);

        return output ?? result;
      }, expenses ?? []);
    },
    [pipeline],
  );

  const processedExpenses = useMemo(() => {
    return applyPipeline(expenses ?? [], filters);
  }, [expenses, filters, applyPipeline]);

  const limitedExpenses = processedExpenses.slice(0, Number(visibleCount));

  const totalAmount = useMemo(() => {
    return totalCalculate(expenses);
  }, [expenses]);

  const filteredTotal = useMemo(() => {
    return totalCalculate(processedExpenses);
  }, [processedExpenses]);

  const totalRecords = useMemo(() => {
    return expenses.length;
  }, [expenses]);

  const categories = useMemo(() => {
    return getUniqueCategories(expenses);
  }, [expenses]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setVisibleCount(40);
  };

  const hasActiveFilters =
    filters.title.trim() !== "" ||
    filters.month !== "all" ||
    filters.sortBy !== "smallest" ||
    filters.startDate !== "" ||
    filters.endDate !== "";

  useEffect(() => {
    saveToLocalStorage("visibleCount", String(visibleCount));
  }, [visibleCount]);

  return {
    filters,
    handleFilterChange,
    resetFilters,
    hasActiveFilters,
    totalAmount,
    filteredTotal,
    totalRecords,
    limitedExpenses,
    handleLoadMore,
    processedExpenses,
    visibleCount,
    categories,
  };
}

export default useFilters;
