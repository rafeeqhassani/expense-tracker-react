const CATEGORY_STAT_FIELDS = [
  { key: "displayLimit", label: "Limit" },
  { key: "displaySpent", label: "Spent" },
  { key: "displayRemaining", label: "Remaining" },
  { key: "displayPercent", label: "Usage" },
];

function CategoryBudget({ categories = {}, search = "" }) {
  const searchTerm = search.toLowerCase();

  const categoryEntries = Object.entries(categories);

  const filteredCategories = categoryEntries.filter(([category]) =>
    category.toLowerCase().includes(searchTerm),
  );

  const noCategories = categoryEntries.length === 0;

  const noMatchesFound =
    search.trim() !== "" && filteredCategories.length === 0;

  return (
    <section className="category-budget">
      <header className="category-budget-header">
        <div className="category-budget-heading">
          <h2>Category Budget</h2>
          <p>Spending breakdown by category</p>
        </div>
      </header>

      <div className="category-grid">
        {filteredCategories.map(([category, budget]) => (
          <article key={category} className={`category-card ${budget.status}`}>
            <header className="category-card-header">
              <h3>{category}</h3>
            </header>

            <div className="category-stats">
              {CATEGORY_STAT_FIELDS.map(({ key, label }) => (
                <p key={key}>
                  <span>{label}</span>
                  <strong>{budget[key]}</strong>
                </p>
              ))}
            </div>

            <div className="status-label">{budget.riskLabel}</div>
          </article>
        ))}

        {noCategories && (
          <p className="empty-state">
            No categories available. Add expenses first to manage category
            budgets.
          </p>
        )}

        {noMatchesFound && (
          <p className="empty-state">No matching categories found.</p>
        )}
      </div>
    </section>
  );
}

export default CategoryBudget;
