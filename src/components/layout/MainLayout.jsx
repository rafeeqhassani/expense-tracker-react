import { useEffect, useState } from "react";

import Header from "../expenses/Header";
import Filters from "../expenses/Filters";
import ExpenseList from "../expenses/ExpenseList";
import GeneralActionsBar from "../expenses/GeneralActionsBar";
import BulkActionsBar from "../expenses/BulkActionsBar";
import ExpenseForm from "../modal/ExpenseForm";
import Toast from "../ui/Toast";
import Sidebar from "./SideBar";
import ExpenseReports from "../expenses/ExpenseReports";

function MainLayout({ data, reports, form, toast, actions }) {
  const {
    visibleExpenses,
    processedExpenses,
    visibleCount,
    categories,
    filters,
  } = data;

  const { formData, mode, isFormOpen, errors, touched, submitAttempted } = form;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      isFormOpen || sidebarOpen ? "hidden" : "auto";
  }, [isFormOpen, sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        actions.closeForm();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [actions]);

  return (
    <div className="dashboard">
      <Sidebar
        openForm={actions.openForm}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <main className="main">
        <Header toggleSidebar={toggleSidebar} openForm={actions.openForm} />

        <Filters
          filters={filters}
          handleFilterChange={actions.handleFilterChange}
          hasActiveFilters={actions.hasActiveFilters}
          resetFilters={actions.resetFilters}
        />

        <ExpenseReports overall={reports.overall} filtered={reports.filtered} />

        <BulkActionsBar
          onClearSelected={actions.handleClearSelected}
          selectedCount={actions.selectedCount}
          selection={{
            allSelected: actions.allSelected,
            someSelected: actions.someSelected,
            handleSelectAll: actions.handleSelectAll,
            handleDeselectAll: actions.handleDeselectAll,
          }}
        />

        <ExpenseList
          expenses={visibleExpenses}
          searchQuery={filters.title}
          onDelete={actions.handleDeleteExpense}
          onEdit={actions.handleEditExpense}
          onToggleSelected={actions.handleToggleSelected}
        />

        <GeneralActionsBar
          onLoadMore={actions.handleLoadMore}
          processedExpenses={processedExpenses}
          visibleCount={visibleCount}
          onClearAll={actions.handleClearAll}
        />
      </main>

      {isFormOpen && (
        <div className="overlay" onClick={actions.closeForm}>
          {" "}
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {" "}
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
            />{" "}
          </div>{" "}
        </div>
      )}

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}

export default MainLayout;
