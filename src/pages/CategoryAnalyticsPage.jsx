import useAppContext from "../providers/useAppContext";

import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function CategoryAnalyticsPage() {
  const { categoryAnalytics } = useAppContext();

  if (categoryAnalytics.loading) {
    return <LoadingState message="Loading categories..." />;
  }

  if (categoryAnalytics.error) {
    return (
      <ErrorState
        message={categoryAnalytics.error}
        onRetry={categoryAnalytics.loadCategories}
      />
    );
  }

  return (
    <section className="category-analytics-page">
      <header className="category-page-header">
        <h2>Categories</h2>
        <p>Analyze your spending distribution across categories.</p>
      </header>

      <div className="category-analytics-grid">
        {categoryAnalytics.categories.map((item) => (
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
        ))}
      </div>
    </section>
  );
}

export default CategoryAnalyticsPage;
