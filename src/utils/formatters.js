/**
 * Formatting, normalization, and comparison helpers used when displaying
 * or persisting expense/budget/chart data.
 */

export function formatCurrency(value) {
  return Number(value || 0).toLocaleString("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  });
}

const RISK_LABELS = {
  safe: "Low Risk",
  warning: "Medium Risk",
  high: "High Risk",
  over: "Critical Risk",
};

export function formatBudget(budget) {
  const riskLabel = RISK_LABELS[budget.status] || "Not Set";

  return {
    ...budget,
    displaySpent: budget.spent.toLocaleString(),
    displayLimit: budget.limit.toLocaleString(),
    displayRemaining:
      budget.remaining < 0
        ? `-${Math.abs(budget.remaining).toLocaleString()}`
        : budget.remaining.toLocaleString(),
    displayPercent: `${Math.min(budget.percentUsed, 9999).toFixed(1)}%`,
    riskLabel,
  };
}
