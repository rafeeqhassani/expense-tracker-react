import {
  FaWallet,
  FaChartLine,
  FaReceipt,
  FaPlusCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
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
          <span>
            {" "}
            <FaWallet className="logo-icon" />
          </span>
          Dashboard
          <div className="close-btn">
            <button onClick={toggleSidebar}>
              <FaXmark />
            </button>
          </div>
        </div>

        <nav className="nav">
          <div className="add-new-expense">
            <button className="open-form" onClick={openForm}>
              <span className="add-expense-icon">
                <FaPlusCircle />
              </span>
              <span className="button-text">Add New Expense</span>
            </button>
          </div>

          <div className="sidebar-summary">
            <div className="sidebar-card">
              <FaMoneyBillWave className="card-icon" />
              <span>Total</span>
              <h3 className="total">{total}</h3>
            </div>

            <div className="sidebar-card">
              <FaChartLine className="card-icon" />
              <span>Monthly</span>
              <h3 className="monthly">{monthlyTotal}</h3>
            </div>

            <div className="sidebar-card">
              <FaReceipt className="card-icon" />
              <span>Records</span>
              <h3 className="records">{totalRecords}</h3>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
export default Sidebar;
