import { useState, useMemo, useCallback } from "react";
import {
  filterByMonth,
  sortExpenses,
  searchExpenses,
  filterByDateRange,
  getUniqueCategories,
} from "../utils/expenseDerive";

import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage";

const INITIAL_FILTERS = {
  title: "",
  month: "all",
  startDate: "",
  endDate: "",
  sortBy: "smallest",
};

function useFilters(expenses) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Ordered list of filter/sort steps applied to the expense list. Each step
  // only runs when `shouldRun` says its filter is actually active, so e.g.
  // an empty search term or "all" month doesn't do unnecessary work.
  const pipeline = useMemo(
    () => [
      {
        fn: searchExpenses,
        shouldRun: (activeFilters) => activeFilters.title.trim().length > 0,
      },
      {
        fn: filterByMonth,
        shouldRun: (activeFilters) => activeFilters.month !== "all",
      },
      {
        fn: filterByDateRange,
        shouldRun: (activeFilters) =>
          activeFilters.startDate || activeFilters.endDate,
      },
      {
        fn: sortExpenses,
        shouldRun: () => true,
      },
    ],
    [],
  );

  const applyPipeline = useCallback(
    (expenseList, activeFilters) => {
      return pipeline.reduce((result, step) => {
        if (!step.shouldRun(activeFilters)) return result;

        const output = step.fn(result, activeFilters);
        return output ?? result;
      }, expenseList ?? []);
    },
    [pipeline],
  );

  const processedExpenses = useMemo(
    () => applyPipeline(expenses ?? [], filters),
    [expenses, filters, applyPipeline],
  );

  const hasActiveFilters =
    filters.title.trim() !== "" ||
    filters.month !== "all" ||
    filters.sortBy !== "smallest" ||
    filters.startDate !== "" ||
    filters.endDate !== "";

  const displayedExpenses = processedExpenses;

  const categories = useMemo(() => getUniqueCategories(expenses), [expenses]);

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return {
    filters,
    handleFilterChange,
    resetFilters,
    hasActiveFilters,
    displayedExpenses,
    processedExpenses,
    categories,
  };
}

export default useFilters;
