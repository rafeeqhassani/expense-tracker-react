function CategoryBudgetEditor({
  categoryLimits,
  allCategories,
  updateCategoryLimit,
}) {
  return (
    <section className="category-budget-editor">
      <h3>Category Budget Settings</h3>

      {allCategories.map((category) => (
        <div key={category}>
          <label>{category}</label>

          <input
            type="number"
            value={categoryLimits[category] ?? 0}
            onChange={(e) => updateCategoryLimit(category, e.target.value)}
          />
        </div>
      ))}
    </section>
  );
}
export default CategoryBudgetEditor;
