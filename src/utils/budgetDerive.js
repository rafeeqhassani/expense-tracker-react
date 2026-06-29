export function calculateTotalSpent(expenses) {
  return expenses.reduce((sum, exp) => {
    const amount = Number(exp.amount) || 0;
    return sum + amount;
  }, 0);
}

export function calculateCategorySpent(expenses) {
  return expenses.reduce((acc, exp) => {
    const category = (exp.category || "uncategorized").toLowerCase().trim();

    const amount = Number(exp.amount) || 0;

    acc[category] = (acc[category] || 0) + amount;
    return acc;
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
      status: "not_set",
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

export function getBudgetAlerts(monthlyStatus, categoryStatuses) {
  const alerts = [];

  switch (monthlyStatus.status) {
    case "safe":
      alerts.push({
        type: "safe",
        scope: "monthly",
        message: "Monthly budget is healthy.",
      });
      break;

    case "warning":
      alerts.push({
        type: "warning",
        scope: "monthly",
        message: "Monthly budget is 70% used.",
      });
      break;

    case "high":
      alerts.push({
        type: "high",
        scope: "monthly",
        message: "Monthly budget is almost exhausted.",
      });
      break;

    case "over":
      alerts.push({
        type: "over",
        scope: "monthly",
        message: "Monthly budget exceeded.",
      });
      break;
  }

  Object.entries(categoryStatuses).forEach(([category, status]) => {
    switch (status.status) {
      case "safe":
        alerts.push({
          type: "safe",
          scope: "category",
          category,
          message: `${category} budget is healthy.`,
        });
        break;

      case "warning":
        alerts.push({
          type: "warning",
          scope: "category",
          category,
          message: `${category} budget is 70% used.`,
        });
        break;

      case "high":
        alerts.push({
          type: "high",
          scope: "category",
          category,
          message: `${category} budget is almost exhausted.`,
        });
        break;

      case "over":
        alerts.push({
          type: "over",
          scope: "category",
          category,
          message: `${category} budget exceeded.`,
        });
        break;
    }
  });

  return alerts;
}
