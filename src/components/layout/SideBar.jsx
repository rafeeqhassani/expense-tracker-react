function Sidebar({ openForm, total, monthlyTotal, totalRecords }) {
  return (
    <aside className="sidebar">
      <div className="logo">💰 Expense Dashboard</div>

      <nav className="nav">
        <button
          className="open-form"
          onClick={openForm}
          aria-label="Add new expense"
        >
          + Add New Expense
        </button>

        <div className="sidebar-summary">
          <div className="sidebar-card">
            <span>Total</span>
            <h3 className="total-amount">{total}</h3>
          </div>
          <div className="sidebar-card">
            <span>Monthly</span>
            <h3 className="monthly-total">{monthlyTotal}</h3>
          </div>
          <div className="sidebar-card">
            <span>Records</span>
            <h3 className="records">{totalRecords}</h3>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
