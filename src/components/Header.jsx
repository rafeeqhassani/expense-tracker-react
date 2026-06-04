function Header({ total, monthlyTotal, showForm }) {
  return (
    <section className="app-header">
      <h1>Expense Tracker</h1>
      <div className="summary">
        <div className="row">
          <span>Total:</span>
          <span className="total-amount">{total}</span>
        </div>
        <div className="row">
          <span>Monthly: </span>
          <span className="monthly-total">{monthlyTotal}</span>
        </div>
      </div>

      <button
        className="open-form"
        onClick={showForm}
        aria-label="Add new expense"
      >
        Add New Expense
      </button>
    </section>
  );
}

export default Header;
