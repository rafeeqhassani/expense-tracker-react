import { useNavigate } from "react-router-dom";
import MonthlyBudget from "../budgets/MonthlyBudget";
import CategoryBudgetSummaryAlert from "../budgets/CategoryBudgetSummaryAlert";

function DashboardBudget({ budget, categorySummary }) {
  const navigate = useNavigate();

  const hasBudget = budget && budget.status !== "not_set";

  return (
    <section className="dashboard-budget">
      <div className="budget-section-header">
        <div>
          <h2>Monthly Budget</h2>

          <p>
            {hasBudget
              ? "Monitor your monthly spending and budget progress."
              : "Set a monthly budget to track your spending progress."}
          </p>
        </div>

        {!hasBudget && (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/dashboard/budget?tab=monthly")}
          >
            Create Budget
          </button>
        )}
      </div>

      {hasBudget && <MonthlyBudget budget={budget} />}

      <CategoryBudgetSummaryAlert summary={categorySummary} />
    </section>
  );
}

export default DashboardBudget;
