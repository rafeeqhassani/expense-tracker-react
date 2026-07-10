import useHoldButton from "../../hooks/useHoldButton";

const STEP_AMOUNT = 1;

function MonthlyBudgetEditor({ monthlyLimit, updateMonthlyLimit }) {
  const { start, stop } = useHoldButton();

  const decrement = () =>
    start(() => updateMonthlyLimit((prev) => Math.max(0, prev - STEP_AMOUNT)));
  const increment = () =>
    start(() => updateMonthlyLimit((prev) => prev + STEP_AMOUNT));

  return (
    <section className="budget-editor">
      <h3>Monthly Budget Settings</h3>

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
          value={monthlyLimit}
          onChange={(e) => updateMonthlyLimit(e.target.value)}
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
    </section>
  );
}

export default MonthlyBudgetEditor;
