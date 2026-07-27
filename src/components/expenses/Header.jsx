import useAppContext from "../../providers/useAppContext";
import { FaPlusCircle, FaBars } from "react-icons/fa";

function Header({ toggleSidebar, openForm }) {
  const { auth } = useAppContext();

  const isDemoAccount = auth.user?.email === "demo@expense.com";

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

      <div className="header-top">
        <h1>Expense Tracker</h1>
        <p>Manage your expenses</p>

        <p>Welcome, {auth.user?.name || auth.user?.email}</p>

        {isDemoAccount && <span className="demo-badge">Demo Account</span>}
      </div>
    </section>
  );
}

export default Header;
