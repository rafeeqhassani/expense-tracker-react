import useAppContext from "../providers/useAppContext";

import DashboardStats from "../components/dashboard/DashboardStats";
import BudgetAlertList from "../components/budgets/BudgetAlertList";

import ExpenseAnalytics from "../components/expenses/ExpenseAnalytics";
import ExpenseCharts from "../components/charts/ExpenseCharts";
import RecentActivity from "../components/activities/RecentActivity";

function DashboardPage() {
  const { analytics, budget, data } = useAppContext();

  const { processedExpenses, activities } = data;

  return (
    <>
      <DashboardStats data={analytics.dashboard} />

      <BudgetAlertList alerts={budget.alerts} />

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
