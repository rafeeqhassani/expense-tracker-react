function Header({ total, monthlyTotal, totalRecords }) {
  return (
    <section className="app-header">
      <div className="header-top">
        <h1>Expense Tracker</h1>
        <p>Manage your expenses efficiently </p>
      </div>

      <div className="summary">
        <div className="summary-card">
          <span>Total</span>
          <h3 className="total-amount">{total}</h3>
        </div>
        <div className="summary-card">
          <span>Monthly</span>
          <h3 className="monthly-total">{monthlyTotal}</h3>
        </div>
        <div className="summary-card">
          <span>Records</span>
          <h3 className="records">{totalRecords}</h3>
        </div>
      </div>
    </section>
  );
}

export default Header;
