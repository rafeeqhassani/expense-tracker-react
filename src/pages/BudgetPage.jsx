import { useState } from "react";
import useQueryParam from "../hooks/useQueryParam";
import useAppContext from "../providers/useAppContext";

import MonthlyBudget from "../components/budgets/MonthlyBudget";
import MonthlyBudgetEditor from "../components/budgets/MonthlyBudgetEditor";
import CategoryBudget from "../components/budgets/CategoryBudget";
import CategoryBudgetEditor from "../components/budgets/CategoryBudgetEditor";
import BudgetAlertList from "../components/budgets/BudgetAlertList";

const TABS = [
  { id: "monthly", label: "Monthly Budget" },
  { id: "category", label: "Category Budget" },
];
const DEFAULT_TAB = "monthly";

function BudgetPage() {
  const {
    budget,
    budgetConfig,
    updateMonthlyLimit,
    updateCategoryLimit,
    data,
  } = useAppContext();

  const { categories } = data;
  const [categorySearch, setCategorySearch] = useState("");

  const queryParam = useQueryParam();
  const activeTab = queryParam.get("tab") || DEFAULT_TAB;

  const setActiveTab = (tab) => {
    queryParam.set("tab", tab);
  };

  return (
    <section className="budget-tabs">
      <BudgetAlertList alerts={budget.alerts} />
      <div className="budget-tab-buttons">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            className={`budget-tab-button ${activeTab === id ? "active" : ""}`}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
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
            <div className="category-budget-header">
              <input
                type="text"
                placeholder="Search category..."
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                className="category-search"
              />
            </div>

            <CategoryBudget
              categories={budget.categories}
              search={categorySearch}
            />

            <CategoryBudgetEditor
              categoryLimits={budgetConfig.categoryLimits}
              allCategories={categories}
              updateCategoryLimit={updateCategoryLimit}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default BudgetPage;
