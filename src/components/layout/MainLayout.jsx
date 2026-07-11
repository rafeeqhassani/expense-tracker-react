import { useEffect, useState } from "react";
import useAppContext from "../../providers/useAppContext";
import { Outlet } from "react-router-dom";

import Header from "../expenses/Header";
import ExpenseForm from "../modal/ExpenseForm";
import Toast from "../ui/Toast";
import Sidebar from "./Sidebar";

function MainLayout() {
  const { data, form, toast, actions } = useAppContext();

  const { categories } = data;

  const { formData, mode, isFormOpen, errors, touched, submitAttempted } = form;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow =
      isFormOpen || sidebarOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFormOpen, sidebarOpen]);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        actions.closeForm();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [actions]);

  return (
    <div className="dashboard">
      <Sidebar
        openForm={actions.openForm}
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />

      <main className="main">
        <Header toggleSidebar={toggleSidebar} openForm={actions.openForm} />

        <Outlet />
      </main>

      {isFormOpen && (
        <div className="overlay" onClick={actions.closeForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <ExpenseForm
              categories={categories}
              onSubmit={actions.handleSubmit}
              mode={mode}
              closeForm={actions.closeForm}
              formData={formData}
              handleChange={actions.handleChange}
              errors={errors}
              submitAttempted={submitAttempted}
              touched={touched}
              isFormOpen={isFormOpen}
            />
          </div>
        </div>
      )}

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}

export default MainLayout;
