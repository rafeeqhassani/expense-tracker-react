import { useState, useMemo } from "react";

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

  return {
    filters,
    setFilters,
    handleFilterChange,
    resetFilters,
    hasActiveFilters,
  };
}

export default useFilters;
