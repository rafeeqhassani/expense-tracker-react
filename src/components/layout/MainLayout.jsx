import { useEffect, useState } from "react";
import useQueryParam from "../../hooks/useQueryParam";

import Header from "../expenses/Header";
import Filters from "../expenses/Filters";
import ExpenseList from "../expenses/ExpenseList";
import GeneralActionsBar from "../expenses/GeneralActionsBar";
import BulkActionsBar from "../expenses/BulkActionsBar";
import ExpenseForm from "../modal/ExpenseForm";
import Toast from "../ui/Toast";
import Sidebar from "./SideBar";
import ExpenseAnalytics from "../expenses/ExpenseAnalytics";
import ExpenseCharts from "../charts/ExpenseCharts";
import MonthlyBudget from "../budgets/MonthlyBudget";
import MonthlyBudgetEditor from "../budgets/MonthlyBudgetEditor";
import CategoryBudget from "../budgets/CategoryBudget";
import CategoryBudgetEditor from "../budgets/CategoryBudgetEditor";
import BudgetAlertList from "../budgets/BudgetAlertList";

function MainLayout({
  data,
  analytics,
  budget,
  budgetConfig,
  updateMonthlyLimit,
  updateCategoryLimit,
  form,
  toast,
  actions,
}) {
  const {
    visibleExpenses,
    processedExpenses,
    visibleCount,
    categories,
    filters,
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
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        actions.closeForm();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [actions]);

  const query = useQueryParam();
  const activeTab = query.get("tab") || "monthly";
  const setTab = (tab) => {
    query.set("tab", tab);
  };

  return (
    <div className="dashboard">
      <Sidebar
        openForm={actions.openForm}
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />

      <main className="main">
        <Header toggleSidebar={toggleSidebar} openForm={actions.openForm} />

        <section className="budget-tabs">
          <BudgetAlertList alerts={budget.alerts} />

          <div className="budget-tab-buttons">
            <button
              className={`budget-tab-button ${
                activeTab === "monthly" ? "active" : ""
              }`}
              onClick={() => setTab("monthly")}
            >
              Monthly Budget
            </button>

            <button
              className={`budget-tab-button ${
                activeTab === "category" ? "active" : ""
              }`}
              onClick={() => setTab("category")}
            >
              Category Budget
            </button>
          </div>

          <div className="budget-tab-content">
            {activeTab === "monthly" && (
              <div className="budget-tab-panel">
                <MonthlyBudget budget={budget.monthly} />
                <MonthlyBudgetEditor
                  monthlyLimit={budgetConfig.monthlyLimit}
                  updateMonthlyLimit={updateMonthlyLimit}
                />
              </div>
            )}

            {activeTab === "category" && (
              <div className="budget-tab-panel">
                <CategoryBudget categories={budget.categories} />
                <CategoryBudgetEditor
                  categoryLimits={budgetConfig.categoryLimits}
                  allCategories={categories}
                  updateCategoryLimit={updateCategoryLimit}
                />
              </div>
            )}
          </div>
        </section>

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
          searchQuery={filters?.title || ""}
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
