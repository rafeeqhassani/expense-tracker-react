import BudgetAlert from "./BudgetAlert";

function CategoryBudgetSummaryAlert({ summary }) {
  if (!summary || summary.notSetCount === 0) {
    return null;
  }

  const count = summary.notSetCount;

  return (
    <BudgetAlert
      alert={{
        type: "info",
        scope: "summary",
        message:
          count === 1
            ? "1 category budget doesn't have a limit."
            : `${count} categories don't have budget limits.`,
      }}
    />
  );
}

export default CategoryBudgetSummaryAlert;
