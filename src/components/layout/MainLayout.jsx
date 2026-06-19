import { useEffect, useState } from "react";

import Header from "../expenses/Header";
import Filters from "../expenses/Filters";
import ExpenseList from "../expenses/ExpenseList";
import ActionsBar from "../expenses/ActionsBar";
import ExpenseForm from "../modal/ExpenseForm";
import Toast from "../ui/Toast";
import Sidebar from "./SideBar";

function MainLayout({ data, form, toast, actions }) {
  const {
    expenses,
    filteredExpenses,
    visibleCount,
    categories,
    filters,
    totals,
  } = data;

  const { totalAmount, filteredTotal, totalRecords } = totals;

  const { formData, mode, isOpen, errors, touched, submitAttempted } = form;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

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
        total={totalAmount}
        monthlyTotal={filteredTotal}
        totalRecords={totalRecords}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <main className="main">
        <Header
          total={totalAmount}
          monthlyTotal={filteredTotal}
          totalRecords={totalRecords}
          toggleSidebar={toggleSidebar}
          openForm={actions.openForm}
        />

        <Filters
          filters={filters}
          handleFilterChange={actions.handleFilterChange}
          hasActiveFilters={actions.hasActiveFilters}
          resetFilters={actions.resetFilters}
        />

        <ExpenseList
          expenses={expenses}
          searchQuery={filters.title}
          onDelete={actions.handleDeleteExpense}
          onEdit={actions.handleEditExpense}
          isChecked={actions.handleCheckboxChange}
        />

        <ActionsBar
          onLoadMore={actions.handleLoadMore}
          filteredExpenses={filteredExpenses}
          visibleCount={visibleCount}
          onClearSelected={actions.handleClearSelected}
          onClearAll={actions.handleClearAll}
        />
      </main>

      {isOpen && (
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
            />
          </div>
        </div>
      )}

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}

export default MainLayout;
