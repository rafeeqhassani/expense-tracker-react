import useAppContext from "../providers/useAppContext";

import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardBudget from "../components/dashboard/DashboardBudget";
import ExpenseAnalytics from "../components/dashboard/ExpenseAnalytics";
import ExpenseCharts from "../components/dashboard/ExpenseCharts";
import RecentActivity from "../components/dashboard/RecentActivity";

import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function DashboardPage() {
  const { analytics, budget, activityPreview } = useAppContext();

  if (analytics.loading) {
    return <LoadingState message="Loading analytics..." />;
  }

  if (analytics.error) {
    return (
      <ErrorState message={analytics.error} onRetry={analytics.loadAnalytics} />
    );
  }

  return (
    <div className="dashboard-page">
      <section className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Track your spending, budgets, and financial habits.</p>
      </section>

      <section className="dashboard-overview">
        <DashboardStats data={analytics.dashboard} />
      </section>

      <section className="dashboard-budget">
        <DashboardBudget
          budget={budget.monthly}
          categorySummary={budget.categoryBudgetSummary}
        />
      </section>

      <section className="dashboard-analytics">
        <div className="section-header">
          <h2>Spending Analytics</h2>
          <p>Understand your spending patterns and trends.</p>
        </div>

        <div className="analytics-grid">
          <ExpenseAnalytics
            overall={analytics.summary.overall}
            filtered={analytics.summary.filtered}
          />

          <ExpenseCharts charts={analytics.charts} />
        </div>
      </section>

      <section className="dashboard-activity">
        <RecentActivity
          activities={activityPreview.activities}
          hasMore={activityPreview.hasMore}
          loading={activityPreview.loading}
          error={activityPreview.error}
          loadActivityPreview={activityPreview.loadActivityPreview}
        />
      </section>
    </div>
  );
}

export default DashboardPage;
