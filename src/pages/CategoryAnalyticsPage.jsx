import useAppContext from "../providers/useAppContext";

import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function CategoriesPage() {
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
    <section>
      <h1>Categories</h1>

      {categoryAnalytics.categories.map((item) => (
        <div key={item.category}>
          <h3>{item.category}</h3>
          <p>Total: {item.total}</p>
          <p>Expenses: {item.count}</p>
        </div>
      ))}
    </section>
  );
}

export default CategoriesPage;
