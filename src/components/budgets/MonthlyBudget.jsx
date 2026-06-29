function MonthlyBudget({ budget }) {
  return (
    <section className="monthly-budget">
      <div className="budget-header">
        <h2>Current Month Budget</h2>
        <p>Monthly overview of your spending</p>
      </div>

      <div className="budget-grid">
        <div className="budget-card">
          <span>Limit</span>
          <h3>{budget.displayLimit}</h3>
        </div>

        <div className="budget-card">
          <span>Spent</span>
          <h3>{budget.displaySpent}</h3>
        </div>

        <div className="budget-card">
          <span>Remaining</span>
          <h3>{budget.displayRemaining}</h3>
        </div>

        <div className="budget-card">
          <span>Usage</span>
          <h3>{budget.displayPercent}</h3>
        </div>

        <div className={`budget-status ${budget.status}`}>
          {budget.riskLabel}
        </div>
      </div>
    </section>
  );
}

export default MonthlyBudget;
