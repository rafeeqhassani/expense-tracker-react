import useHoldButton from "../../hooks/useHoldButton";

function CategoryBudgetEditor({
  categoryLimits,
  allCategories,
  updateCategoryLimit,
}) {
  const { start, stop } = useHoldButton();

  return (
    <section className="category-budget-editor">
      <h3>Category Budget Settings</h3>

      {allCategories.map((category) => (
        <div key={category}>
          <label>{category}</label>

          <div className="budget-input">
            <button
              type="button"
              onMouseDown={() =>
                start(() =>
                  updateCategoryLimit(category, (prev) =>
                    Math.max(0, prev - 1),
                  ),
                )
              }
              onMouseUp={stop}
              onMouseLeave={stop}
            >
              −
            </button>

            <input
              type="number"
              step="1"
              value={categoryLimits[category] ?? 0}
              onChange={(e) => updateCategoryLimit(category, e.target.value)}
            />

            <button
              type="button"
              onMouseDown={() =>
                start(() => updateCategoryLimit(category, (prev) => prev + 1))
              }
              onMouseUp={stop}
              onMouseLeave={stop}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default CategoryBudgetEditor;
