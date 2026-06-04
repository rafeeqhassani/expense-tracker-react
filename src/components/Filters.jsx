function Filters({ filters, handleFilterChange }) {
  const { title, month, sortBy } = filters || {};
  return (
    <section className="filters">
      <div className="field">
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

      <div className="field">
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

      <div className="field">
        <label htmlFor="sortSelection">Sort By</label>
        <select
          id="sortSelection"
          name="sortBy"
          value={sortBy}
          onChange={handleFilterChange}
          className="sortSelection"
        >
          <option value="latest">Date: Newest &#9594; Oldest</option>
          <option value="smallest">Amount: Smallest &#8594; Largest</option>
          <option value="largest">Amount: Largest &#8594; Smallest</option>
          <option value="title-ascending">Title: A &#8594; Z</option>
          <option value="title-descending">Title: Z &#8594; A</option>
        </select>
      </div>
    </section>
  );
}

export default Filters;
