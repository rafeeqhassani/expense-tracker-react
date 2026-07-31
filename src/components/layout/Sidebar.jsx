import useAppContext from "../../providers/useAppContext";

import {
  FaWallet,
  FaPlusCircle,
  FaChartLine,
  FaReceipt,
  FaPiggyBank,
  FaSignOutAlt,
  FaHistory,
  FaTags,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

function Sidebar({ openForm, closeSidebar, sidebarOpen }) {
  const { auth } = useAppContext();

  const handleOpenForm = () => {
    openForm();
    closeSidebar();
  };

  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-overlay active" onClick={closeSidebar} />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="logo">
          <div className="logo-left">
            <span>
              <FaWallet className="logo-icon" />
            </span>
            Expense Tracker
          </div>

          <div className="close-btn">
            <button onClick={closeSidebar}>
              <FaXmark />
            </button>
          </div>
        </div>

        <nav className="nav">
          <div className="add-new-expense">
            <button className="open-form" onClick={handleOpenForm}>
              <span className="add-expense-icon">
                <FaPlusCircle />
              </span>

              <span className="button-text">Add New Expense</span>
            </button>
          </div>

          <div className="nav-links">
            <NavLink to="/dashboard" end onClick={closeSidebar}>
              <span className="nav-icon">
                <FaChartLine />
              </span>
              <span className="nav-text">Dashboard</span>
            </NavLink>

            <NavLink to="/dashboard/expenses" onClick={closeSidebar}>
              <span className="nav-icon">
                <FaReceipt />
              </span>
              <span className="nav-text">Expenses</span>
            </NavLink>

            <NavLink to="/dashboard/activities" onClick={closeSidebar}>
              <span className="nav-icon">
                <FaHistory />
              </span>

              <span className="nav-text">Activities</span>
            </NavLink>

            <NavLink to="/dashboard/budget" onClick={closeSidebar}>
              <span className="nav-icon">
                <FaPiggyBank />
              </span>
              <span className="nav-text">Budget Management</span>
            </NavLink>
          </div>

          <div className="logout">
            <button onClick={auth.logout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
