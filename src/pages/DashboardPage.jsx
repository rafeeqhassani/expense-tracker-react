import useAppContext from "../providers/useAppContext";

import DashboardStats from "../components/dashboard/DashboardStats";
import CategoryBudgetSummaryAlert from "../components/budgets/CategoryBudgetSummaryAlert";
import MonthlyBudgetSummaryAlert from "../components/budgets/MonthlyBudgetSummaryAlert";
import ExpenseAnalytics from "../components/expenses/ExpenseAnalytics";
import ExpenseCharts from "../components/charts/ExpenseCharts";
import RecentActivity from "../components/activities/RecentActivity";

function DashboardPage() {
  const { analytics, budget, data } = useAppContext();

  const { processedExpenses, activities } = data;

  return (
    <>
      <DashboardStats data={analytics.dashboard} />
      <MonthlyBudgetSummaryAlert summary={budget.monthlyBudgetSummary} />

      <CategoryBudgetSummaryAlert summary={budget.categoryBudgetSummary} />
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
    </>
  );
}

export default DashboardPage;
