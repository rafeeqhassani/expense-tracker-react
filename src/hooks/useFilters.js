import { useState, useEffect, useMemo } from "react";
import {
  filterByMonth,
  sortExpenses,
  searchExpenses,
  totalCalculate,
  getUniqueCategories,
} from "../utils/expenseDerive";

import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage";

const initialFilters = {
  title: "",
  month: "all",
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

  const searchedExpenses = useMemo(() => {
    return searchExpenses(expenses, filters.title);
  }, [expenses, filters.title]);

  const sortedExpenses = useMemo(() => {
    return sortExpenses(searchedExpenses, filters.sortBy);
  }, [searchedExpenses, filters.sortBy]);

  const monthlyFilteredExpenses = useMemo(() => {
    return filters.month === "all"
      ? sortedExpenses
      : filterByMonth(sortedExpenses, Number(filters.month));
  }, [sortedExpenses, filters.month]);

  const filteredExpenses = monthlyFilteredExpenses;
  const limitedExpenses = filteredExpenses.slice(0, Number(visibleCount));

  const totalAmount = useMemo(() => {
    return totalCalculate(expenses);
  }, [expenses]);

  const filteredTotal = useMemo(() => {
    return totalCalculate(filteredExpenses);
  }, [filteredExpenses]);

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
    filters.title !== "" ||
    filters.month !== "all" ||
    filters.sortBy !== "smallest";

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
    filteredExpenses,
    visibleCount,
    categories,
  };
}

export default useFilters;
