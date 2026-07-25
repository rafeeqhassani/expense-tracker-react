import { useState, useEffect, memo } from "react";
import useHoldButton from "../../hooks/useHoldButton";

const STEP_AMOUNT = 1;

function CategoryBudgetRow({ category, limit, updateCategoryLimit }) {
  const { start, stop } = useHoldButton();

  const [inputValue, setInputValue] = useState(String(limit));

  useEffect(() => {
    setInputValue(String(limit));
  }, [limit]);

  const decrement = () =>
    start(() =>
      updateCategoryLimit(category, (prev) => Math.max(0, prev - STEP_AMOUNT)),
    );
  const increment = () =>
    start(() => updateCategoryLimit(category, (prev) => prev + STEP_AMOUNT));

  const handleChange = (e) => {
    let value = e.target.value;

    value = value.replace(/^0+(?=\d)/, "");

    setInputValue(value);

    updateCategoryLimit(category, value === "" ? 0 : Number(value));
  };

  return (
    <div>
      <label>{category}</label>

      <div className="budget-input">
        <button
          type="button"
          onPointerDown={decrement}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
        >
          −
        </button>

        <input
          type="number"
          step={STEP_AMOUNT}
          value={inputValue}
          onChange={handleChange}
        />

        <button
          type="button"
          onPointerDown={increment}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
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

export default memo(CategoryBudgetEditor);
