import useAppContext from "../providers/useAppContext";

import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function CategoryAnalyticsPage() {
  const { categoryAnalytics } = useAppContext();

  const { categories = [], loading, error } = categoryAnalytics;

  if (loading) {
    return <LoadingState message="Loading category analytics..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <section className="category-analytics-page">
      <header className="page-header">
        <div>
          <h2>Categories</h2>
          <p>Analyze your spending distribution across categories.</p>
        </div>
      </header>

      <div className="category-analytics-grid">
        {categories.length === 0 ? (
          <p className="empty-state">
            No category spending data available yet.
          </p>
        ) : (
          categories.map((item) => (
            <article className="category-analytics-card" key={item.category}>
              <h3>{item.category}</h3>

              <div className="category-metrics">
                <div>
                  <span>Total Spent</span>
                  <strong className="u-tabular-nums">{item.total}</strong>
                </div>

                <div>
                  <span>Transactions</span>
                  <strong>{item.count}</strong>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default CategoryAnalyticsPage;
