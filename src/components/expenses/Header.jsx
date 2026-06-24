import { FaPlusCircle, FaBars } from "react-icons/fa";

function Header({ toggleSidebar, openForm }) {
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
      </div>
    </section>
  );
}

export default Header;
