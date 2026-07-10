import { useEffect, useState } from "react";
import useAppContext from "../../providers/useAppContext";

import Header from "../expenses/Header";
import Filters from "../expenses/Filters";
import ExpenseList from "../expenses/ExpenseList";
import GeneralActionsBar from "../expenses/GeneralActionsBar";
import BulkActionsBar from "../expenses/BulkActionsBar";
import ExpenseForm from "../modal/ExpenseForm";
import Toast from "../ui/Toast";
import Sidebar from "./Sidebar";
import ExpenseAnalytics from "../expenses/ExpenseAnalytics";
import ExpenseCharts from "../charts/ExpenseCharts";
import DashboardStats from "../dashboard/DashboardStats";
import BudgetController from "../../controllers/BudgetController";
import RecentActivity from "../activities/RecentActivity";

function MainLayout() {
  const {
    data,
    analytics,
    budget,
    budgetConfig,
    updateMonthlyLimit,
    updateCategoryLimit,
    form,
    toast,
    actions,
  } = useAppContext();

  const {
    displayedExpenses,
    processedExpenses,
    visibleCount,
    categories,
    filters,
    activities,
  } = data;

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
  }, [isFormOpen, sidebarOpen]);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        actions.closeForm();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
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
        <DashboardStats data={analytics.dashboard} />
        <BudgetController
          budget={budget}
          budgetConfig={budgetConfig}
          updateMonthlyLimit={updateMonthlyLimit}
          updateCategoryLimit={updateCategoryLimit}
          categories={categories}
        />
        <Filters
          filters={filters}
          handleFilterChange={actions.handleFilterChange}
          hasActiveFilters={actions.hasActiveFilters}
          resetFilters={actions.resetFilters}
        />

        <section className="analytics-section">
          <div className="section-header">
            <h2>Analytics</h2>
            <p>Overview of your spending behavior</p>
          </div>

          <div className="analytics-grid">
            <ExpenseAnalytics
              overall={analytics.overall}
              filtered={analytics.filtered}
            />
            <ExpenseCharts expenses={processedExpenses} />
          </div>
        </section>

        <RecentActivity activities={activities} />

        <BulkActionsBar
          onClearSelected={actions.handleRemoveSelected}
          selectedCount={actions.selectedCount}
          selection={{
            allSelected: actions.allSelected,
            someSelected: actions.someSelected,
            handleSelectAll: actions.handleSelectAll,
            handleDeselectAll: actions.handleDeselectAll,
          }}
        />

        {actions.lastDeletedExpense && (
          <div className="undo-bar">
            <span>Expense deleted</span>
            <button onClick={actions.handleUndoDelete}>Undo</button>
          </div>
        )}

        <ExpenseList
          expenses={displayedExpenses}
          searchQuery={filters?.title || ""}
          onDelete={actions.handleDeleteExpense}
          onEdit={actions.handleEditExpense}
        />

        <GeneralActionsBar
          onLoadMore={actions.handleLoadMore}
          processedExpenses={processedExpenses}
          visibleCount={visibleCount}
          onClearAll={actions.handleClearAll}
          hasActiveFilters={actions.hasActiveFilters}
        />
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
