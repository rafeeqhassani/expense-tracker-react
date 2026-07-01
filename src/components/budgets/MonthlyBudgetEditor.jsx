import useHoldButton from "../../hooks/useHoldButton";

function MonthlyBudgetEditor({ monthlyLimit, updateMonthlyLimit }) {
  const { start, stop } = useHoldButton();

  return (
    <section className="budget-editor">
      <h3>Monthly Budget Settings</h3>

      <div className="budget-input">
        <button
          type="button"
          onMouseDown={() =>
            start(() => updateMonthlyLimit((prev) => Math.max(0, prev - 1)))
          }
          onMouseUp={stop}
          onMouseLeave={stop}
        >
          −
        </button>

        <input
          type="number"
          step="1"
          value={monthlyLimit}
          onChange={(e) => updateMonthlyLimit(e.target.value)}
        />

        <button
          type="button"
          onMouseDown={() =>
            start(() => updateMonthlyLimit((prev) => prev + 1))
          }
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
