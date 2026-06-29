function MonthlyBudgetEditor({ monthlyLimit, updateMonthlyLimit }) {
  return (
    <section className="budget-editor">
      <h3>Monthly Budget Settings</h3>

      <input
        type="number"
        value={monthlyLimit}
        onChange={(e) => updateMonthlyLimit(e.target.value)}
      />
    </section>
  );
}
export default MonthlyBudgetEditor;
