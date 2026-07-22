import { FaArrowCircleRight, FaCalendarAlt } from "react-icons/fa";

const MONTH_OPTIONS = [
  { value: "", label: "All Months" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const SORT_OPTIONS = [
  { value: "date", label: "Date" },
  { value: "amount", label: "Amount" },
  { value: "title", label: "Title" },
  { value: "category", label: "Category" },
];

function Filters({
  filters,
  handleFilterChange,
  hasActiveFilters,
  resetFilters,
}) {
  const {
    search = "",
    month = "",
    sortBy = "date",
    sortOrder = "desc",
    startDate = "",
    endDate = "",
  } = filters || {};

  return (
    <section className="filters">
      <div className="filters-top">
        {/* Search */}
        <div className="filter-group">
          <label htmlFor="searchExpenses">Search</label>

          <input
            type="text"
            id="searchExpenses"
            name="search"
            value={search}
            onChange={handleFilterChange}
            placeholder="Search by title, amount, category..."
          />
        </div>

        {/* Month */}
        <div className="filter-group">
          <label htmlFor="filterByMonth">Month</label>

          <select
            id="filterByMonth"
            name="month"
            value={month}
            onChange={handleFilterChange}
            className="filterByMonth"
          >
            {MONTH_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="filter-group">
          <label htmlFor="sortSelection">Sort By</label>

          <select
            id="sortSelection"
            name="sortBy"
            value={sortBy}
            onChange={handleFilterChange}
            className="sortSelection"
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div className="filter-group">
          <label htmlFor="sortOrder">Order</label>

          <select
            id="sortOrder"
            name="sortOrder"
            value={sortOrder}
            onChange={handleFilterChange}
          >
            <option value="desc">Descending</option>

            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Date Range */}
      <div className="filters-bottom">
        <div className="filter-group date-range">
          <label className="date-label">
            <FaCalendarAlt style={{ marginRight: "6px" }} />
            Date Range Filter
          </label>

          <div className="date-inputs">
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={handleFilterChange}
            />

            <span className="date-separator">
              <FaArrowCircleRight />
            </span>

            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        {/* Reset */}
        <div className="filter-button-group">
          {hasActiveFilters && (
            <button
              type="button"
              className="clear-filtered"
              onClick={resetFilters}
            >
              Reset filters
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Filters;
