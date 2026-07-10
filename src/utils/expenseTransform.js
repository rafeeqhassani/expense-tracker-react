import {
  getCategoryChartData,
  getMonthlyTrendChartData,
  getPieChartData,
} from "./chartsDerive";

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

export function normalizeExpenseData(data, existingId = null) {
  const parsedAmount = Number(String(data.amount).trim());
  const isValidDate = data.date && !isNaN(Date.parse(data.date));

  return {
    id: existingId || crypto.randomUUID(),
    title: data.title.trim(),
    amount: Number.isFinite(parsedAmount) ? parsedAmount : 0,
    category: (data.customCategory || data.category).trim().toLowerCase(),
    date: isValidDate ? data.date : new Date().toISOString().split("T")[0],
    recurring: data.recurring ?? "none",
    lastGeneratedDate: data.lastGeneratedDate ?? "",
    deleted: false,
  };
}

export function isSameData(oldData, newData) {
  return (
    oldData.title === newData.title &&
    Number(oldData.amount) === Number(newData.amount) &&
    (oldData.category || "").trim().toLowerCase() ===
      (newData.category || "").trim().toLowerCase() &&
    oldData.date === newData.date
  );
}
