const BUDGET_CARDS = [
  { key: "displayLimit", label: "Limit" },
  { key: "displaySpent", label: "Spent" },
  { key: "displayRemaining", label: "Remaining" },
  { key: "displayPercent", label: "Usage" },
];

function BudgetCard({ label, value }) {
  return (
    <div className="budget-card">
      <span>{label}</span>
      <h3>{value}</h3>
    </div>
  );
}

function MonthlyBudget({ budget }) {
  return (
    <section className="monthly-budget">
      <div className="budget-header">
        <h2>Current Month Budget</h2>
        <p>Monthly overview of your spending</p>
      </div>

      <div className="budget-grid">
        {BUDGET_CARDS.map(({ key, label }) => (
          <BudgetCard key={key} label={label} value={budget[key]} />
        ))}

        <div className={`budget-status ${budget.status}`}>
          {budget.riskLabel}
        </div>
      </div>
    </section>
  );
}

export default MonthlyBudget;
