import {
  getCategoryChartData,
  getMonthlyTrendChartData,
  getPieChartData,
} from "./chartsDerive";

export function formatCurrency(value) {
  return Number(value || 0).toLocaleString("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  });
}
export function getChartData(type, expenses) {
  switch (type) {
    case "bar":
      return getCategoryChartData(expenses);

    case "line":
      return getMonthlyTrendChartData(expenses);

    case "pie":
      return getPieChartData(expenses);

    default:
      return [];
  }
}

export function formatBudget(b) {
  let riskLabel;

  switch (b.status) {
    case "safe":
      riskLabel = "Low Risk";
      break;

    case "warning":
      riskLabel = "Medium Risk";
      break;

    case "high":
      riskLabel = "High Risk";
      break;

    case "over":
      riskLabel = "Critical Risk";
      break;

    default:
      riskLabel = "Not Set";
  }

  return {
    ...b,
    displaySpent: b.spent.toLocaleString(),
    displayLimit: b.limit.toLocaleString(),
    displayRemaining:
      b.remaining < 0
        ? `-${Math.abs(b.remaining).toLocaleString()}`
        : b.remaining.toLocaleString(),
    displayPercent: `${Math.min(b.percentUsed, 9999).toFixed(1)}%`,
    riskLabel,
  };
}

export function normalizedData(data, existingId = null) {
  const parsedAmount = Number(String(data.amount).trim());
  const isValidDate = data.date && !isNaN(Date.parse(data.date));
  return {
    id: existingId || crypto.randomUUID(),
    title: data.title.trim(),
    amount: Number.isFinite(parsedAmount) ? parsedAmount : 0,
    category: (data.customCategory || data.category).trim().toLowerCase(),
    date: isValidDate ? data.date : new Date().toISOString().split("T")[0],
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
