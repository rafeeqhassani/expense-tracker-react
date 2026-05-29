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
    setVisibleCount(40);
  };

  const searchedExpenses = useMemo(() => {
    return searchExpenses(expenses, filters.title);
  }, [expenses, filters.title]);

  const sortedExpenses = useMemo(() => {
    return sortExpenses(searchedExpenses, filters.sortBy);
  }, [searchedExpenses, filters.sortBy]);

  const filteredExpenses = useMemo(() => {
    return filters.month === "all"
      ? sortedExpenses
      : filterByMonth(sortedExpenses, Number(filters.month));
  }, [sortedExpenses, filters.month]);

  const totalAmount = useMemo(() => {
    return totalCalculate(expenses);
  }, [expenses]);

  const filteredTotal = useMemo(() => {
    return totalCalculate(filteredExpenses);
  }, [filteredExpenses]);

  const categories = useMemo(() => {
    return getUniqueCategories(expenses);
  }, [expenses]);

  const limitedExpenses = useMemo(() => {
    return filteredExpenses.slice(0, visibleCount);
  }, [filteredExpenses, visibleCount]);

  const hasExpenses = filteredExpenses.length > 0;

  const hasMoreExpenses = filteredExpenses.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  useEffect(() => {
    saveToLocalStorage("visibleCount", visibleCount);
  }, [visibleCount]);

  useEffect(() => {
    filteredExpenses;
  }, [filteredExpenses]);

  return {
    filters,
    handleFilterChange,
    totalAmount,
    filteredTotal,
    limitedExpenses,
    handleLoadMore,
    hasExpenses,
    hasMoreExpenses,
    categories,
  };
}

export default useFilters;
