import { useState, useMemo } from "react";
import { getUniqueCategories } from "../utils/expenseDerive";

const INITIAL_FILTERS = {
  search: "",
  month: "",
  startDate: "",
  endDate: "",
  sortBy: "date",
  sortOrder: "desc",
};

function useFilters(expenses = []) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.month !== "" ||
    filters.startDate !== "" ||
    filters.endDate !== "" ||
    filters.sortBy !== "date";

  const categories = useMemo(() => getUniqueCategories(expenses), [expenses]);

  return {
    filters,
    setFilters,
    handleFilterChange,
    resetFilters,
    hasActiveFilters,
    categories,
  };
}

export default useFilters;
