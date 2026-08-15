import { useState, useEffect, useCallback, useRef } from "react";
import useHoldButton from "../../hooks/useHoldButton";

const MAX_BUDGET_LIMIT = 999999999;
const STEP_AMOUNT = 1;

function MonthlyBudgetEditor({
  monthlyLimit,
  updateMonthlyLimit,
  saveBudgetConfig,
}) {
  const { start, stop } = useHoldButton();

  const [inputValue, setInputValue] = useState(String(monthlyLimit ?? 0));
  const isHoldingRef = useRef(false);

  useEffect(() => {
    setInputValue(String(monthlyLimit));
  }, [monthlyLimit]);

  const decrement = useCallback(() => {
    start(() => updateMonthlyLimit((prev) => Math.max(0, prev - STEP_AMOUNT)));
  }, [start, updateMonthlyLimit]);

  const increment = useCallback(() => {
    start(() => updateMonthlyLimit((prev) => prev + STEP_AMOUNT));
  }, [start, updateMonthlyLimit]);

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
    updateMonthlyLimit(numericValue);
  };

  return (
    <section className="budget-editor">
      <h3>Monthly Budget Settings</h3>

      <div className="budget-input">
        <button
          type="button"
          className="btn btn-primary"
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
          className="btn btn-primary"
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
    </section>
  );
}

export default MonthlyBudgetEditor;
