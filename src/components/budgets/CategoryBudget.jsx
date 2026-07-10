const CATEGORY_STAT_FIELDS = [
  { key: "displayLimit", label: "Limit" },
  { key: "displaySpent", label: "Spent" },
  { key: "displayRemaining", label: "Remaining" },
  { key: "displayPercent", label: "Usage" },
];

function CategoryBudget({ categories, search }) {
  const searchTerm = search.toLowerCase();

  const filteredCategories = Object.entries(categories).filter(([category]) =>
    category.toLowerCase().includes(searchTerm),
  );

  const noMatchesFound =
    search.trim() !== "" && filteredCategories.length === 0;

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
              {CATEGORY_STAT_FIELDS.map(({ key, label }) => (
                <p key={key}>
                  {label}: {budget[key]}
                </p>
              ))}
            </div>

            <div className="status-label">{budget.riskLabel}</div>
          </div>
        ))}

        {noMatchesFound && (
          <p className="empty-state">No matching categories found.</p>
        )}
      </div>
    </section>
  );
}

export default CategoryBudget;
