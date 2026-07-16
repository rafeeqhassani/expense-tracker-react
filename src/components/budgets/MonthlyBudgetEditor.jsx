import { useState, useEffect } from "react";
import useHoldButton from "../../hooks/useHoldButton";

const STEP_AMOUNT = 1;

function MonthlyBudgetEditor({ monthlyLimit, updateMonthlyLimit }) {
  const { start, stop } = useHoldButton();

  const [inputValue, setInputValue] = useState(String(monthlyLimit ?? 0));

  useEffect(() => {
    setInputValue(String(monthlyLimit));
  }, [monthlyLimit]);

  const decrement = () =>
    start(() => updateMonthlyLimit((prev) => Math.max(0, prev - STEP_AMOUNT)));
  const increment = () =>
    start(() => updateMonthlyLimit((prev) => prev + STEP_AMOUNT));

  const handleChange = (e) => {
    let value = e.target.value;

    value = value.replace(/^0+(?=\d)/, "");

    setInputValue(value);

    updateMonthlyLimit(value === "" ? 0 : Number(value));
  };

  return (
    <section className="budget-editor">
      <h3>Monthly Budget Settings</h3>

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
    </section>
  );
}

export default MonthlyBudgetEditor;
