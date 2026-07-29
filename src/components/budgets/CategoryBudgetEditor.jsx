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
    start(() => updateCategoryLimit(category, (prev) => prev + STEP_AMOUNT));
  }, [start, category, updateCategoryLimit]);

  const handleChange = (e) => {
    let value = e.target.value;

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

  return (
    <div>
      <label>{category}</label>

      <div className="budget-input">
        <button
          type="button"
          onPointerDown={() => {
            isHoldingRef.current = true;
            decrement();
          }}
          onPointerUp={() => {
            if (!isHoldingRef.current) return;
            isHoldingRef.current = false;

            stop();
            saveBudgetConfig();
          }}
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
          onPointerDown={() => {
            isHoldingRef.current = true;
            increment();
          }}
          onPointerUp={() => {
            if (!isHoldingRef.current) return;
            isHoldingRef.current = false;

            stop();
            saveBudgetConfig();
          }}
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
  saveBudgetConfig,
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
          saveBudgetConfig={saveBudgetConfig}
        />
      ))}
    </section>
  );
}

export default CategoryBudgetEditor;
