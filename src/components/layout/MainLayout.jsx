import { useEffect, useState } from "react";
import useAppContext from "../../providers/useAppContext";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import ExpenseForm from "./ExpenseForm";
import Toast from "./Toast";
import Sidebar from "./Sidebar";

function MainLayout() {
  const { category, form, toast, actions } = useAppContext();

  const {
    formData,
    mode,
    isFormOpen,
    errors,
    touched,
    submitAttempted,
    submitting,
  } = form;

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
    if (!isFormOpen) return;

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        actions.closeForm();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isFormOpen, actions.closeForm]);

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
        <div className="form-overlay" onClick={actions.closeForm}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Expense form"
            onClick={(e) => e.stopPropagation()}
          >
            <ExpenseForm
              categories={category.categories}
              loading={category.loading}
              error={category.error}
              loadCategories={category.loadCategories}
              onSubmit={actions.handleSubmit}
              mode={mode}
              closeForm={actions.closeForm}
              formData={formData}
              handleChange={actions.handleChange}
              errors={errors}
              submitAttempted={submitAttempted}
              submitting={submitting}
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
