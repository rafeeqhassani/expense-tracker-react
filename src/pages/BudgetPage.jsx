import { useState } from "react";
import useQueryParam from "../hooks/useQueryParam";
import useAppContext from "../providers/useAppContext";

import MonthlyBudget from "../components/budgets/MonthlyBudget";
import MonthlyBudgetEditor from "../components/budgets/MonthlyBudgetEditor";
import CategoryBudget from "../components/budgets/CategoryBudget";
import CategoryBudgetEditor from "../components/budgets/CategoryBudgetEditor";
import BudgetAlertList from "../components/budgets/BudgetAlertList";

import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

const TABS = [
  {
    id: "monthly",
    label: "Monthly Budget",
  },
  {
    id: "category",
    label: "Category Budget",
  },
];

const DEFAULT_TAB = "monthly";

function BudgetPage() {
  const { budget, budgetConfig, actions, category } = useAppContext();

  const [categorySearch, setCategorySearch] = useState("");

  const queryParam = useQueryParam();
  const activeTab = queryParam.get("tab") || DEFAULT_TAB;

  const setActiveTab = (tab) => {
    queryParam.set("tab", tab);
  };

  if (budget.loading) {
    return <LoadingState message="Loading budget..." />;
  }

  if (budget.error) {
    return <ErrorState message={budget.error} onRetry={budget.loadBudget} />;
  }

  return (
    <section className="budget-page">
      <header className="page-header">
        <div>
          <h2>Budget</h2>
          <p>Set spending limits and monitor your progress.</p>
        </div>
      </header>

      <nav className="budget-tab-buttons" aria-label="Budget sections">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`budget-tab-button ${activeTab === id ? "active" : ""}`}
            onClick={() => setActiveTab(id)}
            aria-selected={activeTab === id}
            role="tab"
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="budget-tab-content">
        <BudgetAlertList alerts={budget.alerts} />
        {activeTab === "monthly" && (
          <div className="budget-tab-panel">
            <MonthlyBudget budget={budget.monthly} />

            <MonthlyBudgetEditor
              monthlyLimit={budgetConfig.monthlyLimit}
              updateMonthlyLimit={actions.updateMonthlyLimit}
              saveBudgetConfig={actions.saveBudgetConfig}
            />
          </div>
        )}

        {activeTab === "category" && (
          <div className="budget-tab-panel">
            {category.loading && (
              <LoadingState message="Loading categories..." />
            )}

            {category.error && (
              <ErrorState
                message={category.error}
                onRetry={category.loadCategories}
              />
            )}

            {!category.loading && !category.error && (
              <>
                <div className="category-budget-header">
                  <label htmlFor="category-budget-search">
                    Search categories
                  </label>

                  <input
                    id="category-budget-search"
                    type="search"
                    placeholder="Search category..."
                    value={categorySearch}
                    onChange={(event) => setCategorySearch(event.target.value)}
                    className="category-search"
                  />
                </div>

                <CategoryBudget
                  categories={budget.categories}
                  search={categorySearch}
                />

                <CategoryBudgetEditor
                  categoryLimits={budgetConfig.categoryLimits}
                  allCategories={category.categories}
                  updateCategoryLimit={actions.updateCategoryLimit}
                  saveBudgetConfig={actions.saveBudgetConfig}
                />
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default BudgetPage;
