import { useState, useMemo } from "react";

const INITIAL_FILTERS = {
  search: "",
  month: "",
  startDate: "",
  endDate: "",
  sortBy: "date",
  sortOrder: "desc",
};

function useFilters() {
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

  const hasActiveFilters = Boolean(
    filters.search ||
    filters.month ||
    filters.startDate ||
    filters.endDate ||
    filters.sortBy !== "date" ||
    filters.sortOrder !== "desc",
  );

  return {
    filters,
    setFilters,
    handleFilterChange,
    resetFilters,
    hasActiveFilters,
  };
}

export default useFilters;
