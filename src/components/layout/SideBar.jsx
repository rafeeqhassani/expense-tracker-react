import { FaWallet, FaPlusCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
function Sidebar({
  openForm,

  sidebarOpen,
  toggleSidebar,
}) {
  return (
    <>
      {sidebarOpen && (
        <div
          className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
          onClick={toggleSidebar}
        ></div>
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="logo">
          <div className="logo-left">
            <span>
              {" "}
              <FaWallet className="logo-icon" />
            </span>
            Dashboard
          </div>

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
        </nav>
      </aside>
    </>
  );
}
export default Sidebar;
