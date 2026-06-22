import { FaPlusCircle, FaBars } from "react-icons/fa";
function Header({
  total,
  monthlyTotal,
  totalRecords,
  toggleSidebar,
  openForm,
  allSelected,
  someSelected,
  handleDeselectAll,
  handleSelectAll,
}) {
  return (
    <section className="app-header">
      <div className="mobile-actions">
        <button className="menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <button className="add-btn" onClick={openForm}>
          <FaPlusCircle />
        </button>
      </div>

      <div className="header-top-wrapper">
        <div className="header-top">
          <h1>Expense Tracker</h1>
          <p>Manage your expenses</p>
        </div>

        <div className="global-checkbox">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(el) => {
                if (el) el.indeterminate = someSelected;
              }}
              onChange={(e) => {
                if (e.target.checked) {
                  handleSelectAll();
                } else {
                  handleDeselectAll();
                }
              }}
            />

            <span>Select All</span>
          </label>
        </div>
      </div>

      <div className="summary">
        <div className="summary-card">
          <span>Total</span>
          <h3 className="total">{total}</h3>
        </div>
        <div className="summary-card">
          <span>Monthly</span>
          <h3 className="monthly">{monthlyTotal}</h3>
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
