import useAppContext from "../../providers/useAppContext";

import {
  FaWallet,
  FaPlusCircle,
  FaChartLine,
  FaReceipt,
  FaPiggyBank,
  FaSignOutAlt,
  FaHistory,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <FaChartLine />,
    end: true,
  },
  {
    path: "/dashboard/expenses",
    label: "Records",
    icon: <FaReceipt />,
  },
  {
    path: "/dashboard/activities",
    label: "Activities",
    icon: <FaHistory />,
  },
  {
    path: "/dashboard/budget",
    label: "Budget Management",
    icon: <FaPiggyBank />,
  },
];

function Sidebar({ openForm, closeSidebar, sidebarOpen }) {
  const { auth } = useAppContext();

  const handleOpenForm = () => {
    openForm();
    closeSidebar();
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-overlay active"
          onClick={closeSidebar}
          aria-hidden="true"
        />
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
            <button onClick={closeSidebar} aria-label="Close sidebar">
              <FaXmark />
            </button>
          </div>
        </div>

        <nav className="nav">
          <div className="add-new-expense">
            <button
              className="btn btn-primary open-form"
              onClick={handleOpenForm}
            >
              <span className="add-expense-icon">
                <FaPlusCircle />
              </span>

              <span className="button-text">Add New Expense</span>
            </button>
          </div>

          <div className="nav-links">
            {NAV_ITEMS.map(({ path, label, icon, end }) => (
              <NavLink key={path} to={path} end={end} onClick={closeSidebar}>
                <span className="nav-icon">{icon}</span>
                <span className="nav-text">{label}</span>
              </NavLink>
            ))}
          </div>

          <div className="logout">
            <button
              onClick={() => {
                auth.logout();
                closeSidebar();
              }}
            >
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
