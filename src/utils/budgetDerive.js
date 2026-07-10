const NOT_SET_STATUS = "not_set";

const BUDGET_STATUS_ALERTS = {
  safe: { type: "safe", text: "budget is healthy." },
  warning: { type: "warning", text: "budget is 70% used." },
  high: { type: "high", text: "budget is almost exhausted." },
  over: { type: "over", text: "budget exceeded." },

  [NOT_SET_STATUS]: { type: "info", text: "budget not set yet." },
};

export function calculateTotalSpent(expenses) {
  return expenses.reduce((total, expense) => {
    const amount = Number(expense.amount) || 0;
    return total + amount;
  }, 0);
}

export function calculateCategorySpent(expenses) {
  return expenses.reduce((totalsByCategory, expense) => {
    const category = (expense.category || "uncategorized").toLowerCase().trim();
    const amount = Number(expense.amount) || 0;

    totalsByCategory[category] = (totalsByCategory[category] || 0) + amount;
    return totalsByCategory;
  }, {});
}

export function getBudgetStatus(totalSpent, limit) {
  const safeLimit = Number(limit) || 0;
  const safeSpent = Number(totalSpent) || 0;

  if (safeLimit <= 0) {
    return {
      spent: safeSpent,
      limit: 0,
      remaining: 0,
      percentUsed: 0,
      overspendRatio: 0,
      riskScore: 0,
      status: NOT_SET_STATUS,
    };
  }

  const percentUsed = (safeSpent / safeLimit) * 100;
  const remaining = safeLimit - safeSpent;
  const overspendRatio = safeSpent / safeLimit;

  let status;
  if (percentUsed >= 100) status = "over";
  else if (percentUsed >= 90) status = "high";
  else if (percentUsed >= 70) status = "warning";
  else status = "safe";

  return {
    spent: safeSpent,
    limit: safeLimit,
    remaining,
    percentUsed,
    overspendRatio,
    riskScore: Math.round(Math.min(percentUsed, 100)),
    status,
  };
}

function buildAlert({ status, scope, prefix, category }) {
  const alertInfo = BUDGET_STATUS_ALERTS[status];
  if (!alertInfo) return null;

  const alert = {
    type: alertInfo.type,
    scope,
    message: `${prefix} ${alertInfo.text}`,
  };

  if (category) {
    alert.category = category;
  }

  return alert;
}

export function getBudgetAlerts(monthlyStatus, categoryStatuses) {
  const alerts = [];

  // Monthly: "not_set" intentionally produces no alert (unlike categories).
  if (monthlyStatus.status !== NOT_SET_STATUS) {
    const monthlyAlert = buildAlert({
      status: monthlyStatus.status,
      scope: "monthly",
      prefix: "Monthly",
    });
    if (monthlyAlert) alerts.push(monthlyAlert);
  }

  Object.entries(categoryStatuses).forEach(([category, status]) => {
    const categoryAlert = buildAlert({
      status: status.status,
      scope: "category",
      prefix: category,
      category,
    });
    if (categoryAlert) alerts.push(categoryAlert);
  });

  return alerts;
}
