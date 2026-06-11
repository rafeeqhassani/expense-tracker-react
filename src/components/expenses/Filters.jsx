import { SORT_OPTIONS } from "../../utils/expenseDerive";

function Filters({
  filters,
  handleFilterChange,
  hasActiveFilters,
  resetFilters,
}) {
  const { title, month, sortBy } = filters || {};
  return (
    <section className="filters">
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
          <option value={SORT_OPTIONS.SMALLEST}>
            Amount: Smallest &#8594; Largest
          </option>

          <option value={SORT_OPTIONS.LARGEST}>
            Amount: Largest &#8594; Smallest
          </option>

          <option value={SORT_OPTIONS.TITLE_ASC}>Title: A &#8594; Z</option>

          <option value={SORT_OPTIONS.TITLE_DESC}>Title: Z &#8594; A</option>

          <option value={SORT_OPTIONS.NEWEST}>
            Date: Newest &#8594; Oldest
          </option>

          <option value={SORT_OPTIONS.OLDEST}>
            Date: Oldest &#8594; Newest
          </option>
        </select>
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
    </section>
  );
}

export default Filters;
