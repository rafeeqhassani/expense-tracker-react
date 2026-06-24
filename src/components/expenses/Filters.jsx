import { FaArrowCircleRight, FaCalendarAlt } from "react-icons/fa";

function Filters({
  filters,
  handleFilterChange,
  hasActiveFilters,
  resetFilters,
}) {
  const { title, month, sortBy } = filters || {};
  return (
    <section className="filters">
      <div className="filters-top">
        <div className="filter-group">
          <label htmlFor="searchExpenses">Search</label>
          <input
            type="text"
            id="searchExpenses"
            name="title"
            value={title}
            onChange={handleFilterChange}
            placeholder="Search by title..."
          />
        </div>

        <div className="filter-group">
          <label htmlFor="filterByMonth">Month</label>
          <select
            id="filterByMonth"
            name="month"
            value={month}
            onChange={handleFilterChange}
            className="filterByMonth"
          >
            <option value="all">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sortSelection">Sort By</label>
          <select
            id="sortSelection"
            name="sortBy"
            value={sortBy}
            onChange={handleFilterChange}
            className="sortSelection"
          >
            <option value="smallest">Amount: Smallest &#8594; Largest</option>

            <option value="largest">Amount: Largest &#8594; Smallest</option>
            <option value="newest">Date: Newest &#8594; Oldest</option>

            <option value="oldest">Date: Oldest &#8594; Newest</option>

            <option value="title-ascending">Title: A &#8594; Z</option>

            <option value="title-descending">Title: Z &#8594; A</option>
          </select>
        </div>
      </div>

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
              value={filters.startDate}
              onChange={handleFilterChange}
            />
            <span className="date-separator">
              <FaArrowCircleRight />
            </span>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
        </div>

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
