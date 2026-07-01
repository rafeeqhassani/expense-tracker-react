function CategoryBudget({ categories, search }) {
  const filteredCategories = Object.entries(categories).filter(([category]) =>
    category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="category-budget">
      <div className="budget-header">
        <h2>Category Budget</h2>
        <p>Spending breakdown by category</p>
      </div>

      <div className="category-grid">
        {filteredCategories.map(([category, budget]) => (
          <div key={category} className={`category-card ${budget.status}`}>
            <h4>{category}</h4>

            <div className="category-stats">
              <p>Limit: {budget.displayLimit}</p>
              <p>Spent: {budget.displaySpent}</p>
              <p>Remaining: {budget.displayRemaining}</p>
              <p>Usage: {budget.displayPercent}</p>
            </div>

            <div className="status-label">{budget.riskLabel}</div>
          </div>
        ))}

        {search.trim() ? (
          filteredCategories.length === 0 ? (
            <p className="empty-state">No matching categories found.</p>
          ) : null
        ) : null}
      </div>
    </section>
  );
}

export default CategoryBudget;
