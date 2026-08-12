import useAppContext from "../../providers/useAppContext";
import { FaPlusCircle, FaBars } from "react-icons/fa";

function Header({ toggleSidebar, openForm }) {
  const { auth } = useAppContext();

  const isDemoAccount = auth.user?.email === "demo@expense.com";

  return (
    <header className="header">
      <div className="header-left">
        <button
          type="button"
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label="Open menu"
        >
          <FaBars />
        </button>

        <p className="header-user">
          Welcome, {auth.user?.name || auth.user?.email}
        </p>
      </div>

      <div className="header-top">
        <h1>Expense Tracker</h1>

        {isDemoAccount && <span className="demo-badge">Demo Account</span>}
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="add-btn"
          onClick={openForm}
          aria-label="Add new expense"
        >
          <FaPlusCircle />
        </button>
      </div>
    </header>
  );
}

export default Header;
