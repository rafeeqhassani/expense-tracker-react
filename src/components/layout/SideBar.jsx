function Sidebar({
  openForm,
  total,
  monthlyTotal,
  totalRecords,
  sidebarOpen,
  toggleSidebar,
}) {
  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="logo">
          Expense Dashboard
          <button className="close-btn" onClick={toggleSidebar}>
            ✕
          </button>
        </div>

        <nav className="nav">
          <button className="open-form" onClick={openForm}>
            + Add New Expense
          </button>

          <div className="sidebar-summary">
            <div className="sidebar-card">
              <span>Total</span>
              <h3>{total}</h3>
            </div>

            <div className="sidebar-card">
              <span>Monthly</span>
              <h3>{monthlyTotal}</h3>
            </div>

            <div className="sidebar-card">
              <span>Records</span>
              <h3>{totalRecords}</h3>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
export default Sidebar;
