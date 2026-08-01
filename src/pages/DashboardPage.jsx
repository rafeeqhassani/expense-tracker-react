import useAppContext from "../providers/useAppContext";

import DashboardStats from "../components/dashboard/DashboardStats";
import CategoryBudgetSummaryAlert from "../components/budgets/CategoryBudgetSummaryAlert";
import MonthlyBudgetSummaryAlert from "../components/budgets/MonthlyBudgetSummaryAlert";
import ExpenseAnalytics from "../components/expenses/ExpenseAnalytics";
import ExpenseCharts from "../components/charts/ExpenseCharts";
import RecentActivity from "../components/activities/RecentActivity";

import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function DashboardPage() {
  const { analytics, budget, activityPreview, actions } = useAppContext();

  if (analytics.loading) {
    return <LoadingState message="Loading analytics..." />;
  }

  if (analytics.error) {
    return (
      <ErrorState message={analytics.error} onRetry={analytics.loadAnalytics} />
    );
  }

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
            overall={analytics.summary.overall}
            filtered={analytics.summary.filtered}
          />
          <ExpenseCharts charts={analytics.charts} />
        </div>
      </section>
      <RecentActivity
        activities={activityPreview.activities}
        hasMore={activityPreview.hasMore}
        loading={activityPreview.loading}
        error={activityPreview.error}
        actions={actions.loadActivities}
      />
    </>
  );
}

export default DashboardPage;
