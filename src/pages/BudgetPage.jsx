import { useState } from "react";
import useQueryParam from "../hooks/useQueryParam";

import MonthlyBudget from "../components/budgets/MonthlyBudget";
import MonthlyBudgetEditor from "../components/budgets/MonthlyBudgetEditor";
import CategoryBudget from "../components/budgets/CategoryBudget";
import CategoryBudgetEditor from "../components/budgets/CategoryBudgetEditor";
import BudgetAlertList from "../components/budgets/BudgetAlertList";

function BudgetPage({
  budget,
  budgetConfig,
  updateMonthlyLimit,
  updateCategoryLimit,
  categories,
}) {
  const [search, setSearch] = useState("");

  const query = useQueryParam();
  const activeTab = query.get("tab") || "monthly";

  const setTab = (tab) => {
    query.set("tab", tab);
  };

  return (
    <section className="budget-tabs">
      <BudgetAlertList alerts={budget.alerts} />

      <div className="budget-tab-buttons">
        <button
          className={`budget-tab-button ${activeTab === "monthly" ? "active" : ""}`}
          onClick={() => setTab("monthly")}
        >
          Monthly Budget
        </button>

        <button
          className={`budget-tab-button ${activeTab === "category" ? "active" : ""}`}
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
            <div className="category-budget-header">
              <input
                type="text"
                placeholder="Search category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="category-search"
              />
            </div>

            <CategoryBudget categories={budget.categories} search={search} />

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
