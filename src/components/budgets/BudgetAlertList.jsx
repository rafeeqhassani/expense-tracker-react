import BudgetAlert from "./BudgetAlert";

function BudgetAlertList({ alerts = [] }) {
  if (alerts.length === 0) {
    return null;
  }

  return (
    <section className="budget-alert-list" aria-label="Budget alerts">
      {alerts.map((alert) => (
        <BudgetAlert
          key={`${alert.scope}-${alert.category ?? "monthly"}`}
          alert={alert}
        />
      ))}
    </section>
  );
}

export default BudgetAlertList;
