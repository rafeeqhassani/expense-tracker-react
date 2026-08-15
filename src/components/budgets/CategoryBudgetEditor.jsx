import { useState, useEffect, useCallback, useRef } from "react";
import useHoldButton from "../../hooks/useHoldButton";

const MAX_BUDGET_LIMIT = 999999999;
const STEP_AMOUNT = 1;

function CategoryBudgetRow({
  category,
  limit,
  updateCategoryLimit,
  saveBudgetConfig,
}) {
  const { start, stop } = useHoldButton();

  const [inputValue, setInputValue] = useState(String(limit));
  const isHoldingRef = useRef(false);

  useEffect(() => {
    setInputValue(String(limit));
  }, [limit]);

  const decrement = useCallback(() => {
    start(() =>
      updateCategoryLimit(category, (prev) => Math.max(0, prev - STEP_AMOUNT)),
    );
  }, [start, category, updateCategoryLimit]);

  const increment = useCallback(() => {
    start(() =>
      updateCategoryLimit(category, (prev) =>
        Math.min(MAX_BUDGET_LIMIT, prev + STEP_AMOUNT),
      ),
    );
  }, [start, category, updateCategoryLimit]);

  const handleChange = (event) => {
    let value = event.target.value;

    value = value.replace(/^0+(?=\d)/, "");

    if (value.includes(".") && value.split(".")[1].length > 2) {
      return;
    }

    const numericValue = value === "" ? 0 : Number(value);

    if (numericValue > MAX_BUDGET_LIMIT) {
      return;
    }

    setInputValue(value);
    updateCategoryLimit(category, numericValue);
  };

  const handlePointerUp = () => {
    if (!isHoldingRef.current) {
      return;
    }

    isHoldingRef.current = false;
    stop();
    saveBudgetConfig();
  };

  const handlePointerCancel = () => {
    isHoldingRef.current = false;
    stop();
  };

  return (
    <div className="category-budget-row">
      <div className="category-budget-row-info">
        <span className="category-budget-name">{category}</span>
      </div>

      <div className="budget-input">
        <button
          type="button"
          className="btn btn-primary"
          aria-label={`Decrease ${category} budget`}
          onPointerDown={() => {
            isHoldingRef.current = true;
            decrement();
          }}
          onPointerUp={handlePointerUp}
          onPointerLeave={stop}
          onPointerCancel={handlePointerCancel}
        >
          −
        </button>

        <input
          type="number"
          min="0"
          max={MAX_BUDGET_LIMIT}
          step={STEP_AMOUNT}
          value={inputValue}
          aria-label={`${category} budget limit`}
          onChange={handleChange}
        />

        <button
          type="button"
          className="btn btn-primary"
          aria-label={`Increase ${category} budget`}
          onPointerDown={() => {
            isHoldingRef.current = true;
            increment();
          }}
          onPointerUp={handlePointerUp}
          onPointerLeave={stop}
          onPointerCancel={handlePointerCancel}
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
  saveBudgetConfig,
}) {
  return (
    <section className="category-budget-editor">
      <header className="category-budget-editor-header">
        <h2>Category Budget Settings</h2>
        <p>Set spending limits for individual categories.</p>
      </header>

      <div className="category-budget-list">
        {allCategories.map((category) => (
          <CategoryBudgetRow
            key={category}
            category={category}
            limit={categoryLimits[category] ?? 0}
            updateCategoryLimit={updateCategoryLimit}
            saveBudgetConfig={saveBudgetConfig}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryBudgetEditor;
