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
    return getFromLocalStorage("visibleCount") || 40;
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

  const processedMonthlyExpenses = useMemo(() => {
    if (filters.month === "all") return sortedExpenses;

    return filterByMonth(sortedExpenses, Number(filters.month));
  }, [sortedExpenses, filters.month]);

  const filteredExpenses = processedMonthlyExpenses;
  const limitedExpenses = filteredExpenses.slice(0, visibleCount);

  const totalAmount = useMemo(() => {
    return totalCalculate(expenses);
  }, [expenses]);

  const filteredTotal = useMemo(() => {
    return totalCalculate(filteredExpenses);
  }, [filteredExpenses]);

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
    saveToLocalStorage("visibleCount", visibleCount);
  }, [visibleCount]);

  return {
    filters,
    handleFilterChange,
    resetFilters,
    hasActiveFilters,
    totalAmount,
    filteredTotal,
    limitedExpenses,
    handleLoadMore,
    filteredExpenses,
    visibleCount,
    categories,
  };
}

export default useFilters;
