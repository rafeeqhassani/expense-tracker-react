function Header({ total, monthlyTotal, showForm }) {
  return (
    <section className="app-header">
      <h1>Expense Tracker</h1>
      <div className="summary">
        <h3>
          Total Expenses: <span className="total-amount">{total}</span>
        </h3>
        <h3>
          Monthly Total: <span className="monthly-total">{monthlyTotal}</span>
        </h3>
      </div>
      <button
        className="add-btn"
        onClick={showForm}
        aria-label="Add new expense"
      >
        Add New Expense
      </button>
    </section>
  );
}

export default Header;
