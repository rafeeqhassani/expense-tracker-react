import useHoldButton from "../../hooks/useHoldButton";

const STEP_AMOUNT = 1;

function CategoryBudgetRow({ category, limit, updateCategoryLimit }) {
  const { start, stop } = useHoldButton();

  const decrement = () =>
    start(() =>
      updateCategoryLimit(category, (prev) => Math.max(0, prev - STEP_AMOUNT)),
    );
  const increment = () =>
    start(() => updateCategoryLimit(category, (prev) => prev + STEP_AMOUNT));

  return (
    <div>
      <label>{category}</label>

      <div className="budget-input">
        <button
          type="button"
          onMouseDown={decrement}
          onMouseUp={stop}
          onMouseLeave={stop}
        >
          −
        </button>

        <input
          type="number"
          step={STEP_AMOUNT}
          value={limit}
          onChange={(e) => updateCategoryLimit(category, e.target.value)}
        />

        <button
          type="button"
          onMouseDown={increment}
          onMouseUp={stop}
          onMouseLeave={stop}
        >
          +
        </button>
      </div>
    </div>
  );
}

function CategoryBudgetEditor({
  categoryLimits,
  allCategories,
  updateCategoryLimit,
}) {
  return (
    <section className="category-budget-editor">
      <h3>Category Budget Settings</h3>

      {allCategories.map((category) => (
        <CategoryBudgetRow
          key={category}
          category={category}
          limit={categoryLimits[category] ?? 0}
          updateCategoryLimit={updateCategoryLimit}
        />
      ))}
    </section>
  );
}

export default CategoryBudgetEditor;
