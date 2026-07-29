const NOT_SET_STATUS = "not_set";

const BUDGET_STATUS_ALERTS = {
  safe: { type: "safe", text: "budget is healthy." },
  warning: { type: "warning", text: "budget is 70% used." },
  high: { type: "high", text: "budget is almost exhausted." },
  over: { type: "over", text: "budget exceeded." },
  [NOT_SET_STATUS]: { type: "info", text: "budget need setup." },
};

export function calculateTotalSpent(expenses) {
  return expenses.reduce((total, expense) => {
    return total + (Number(expense.amount) || 0);
  }, 0);
}

export function calculateCategorySpent(expenses) {
  return expenses.reduce((totalsByCategory, expense) => {
    const category = (expense.category || "uncategorized").toLowerCase().trim();

    totalsByCategory[category] =
      (totalsByCategory[category] || 0) + (Number(expense.amount) || 0);

    return totalsByCategory;
  }, {});
}

export function getBudgetStatus(totalSpent, limit) {
  const safeSpent = Number(totalSpent) || 0;
  const safeLimit = Number(limit) || 0;

  if (safeLimit <= 0) {
    return {
      spent: safeSpent,
      limit: 0,
      remaining: 0,
      percentUsed: 0,
      status: NOT_SET_STATUS,
    };
  }

  const percentUsed = (safeSpent / safeLimit) * 100;

  let status = "safe";

  if (percentUsed >= 100) {
    status = "over";
  } else if (percentUsed >= 90) {
    status = "high";
  } else if (percentUsed >= 70) {
    status = "warning";
  }

  return {
    spent: safeSpent,
    limit: safeLimit,
    remaining: safeLimit - safeSpent,
    percentUsed,
    status,
  };
}

export function getMonthlyBudgetSummary(monthlyStatus) {
  if (!monthlyStatus || monthlyStatus.status !== NOT_SET_STATUS) {
    return {
      isSet: true,
      notSet: false,
    };
  }

  return {
    isSet: false,
    notSet: true,
  };
}

// Dashboard summary for categories without budget limits
export function getCategoryBudgetSummary(categoryStatuses) {
  const entries = Object.entries(categoryStatuses);

  const notSetCategories = entries
    .filter(([_, status]) => status.status === NOT_SET_STATUS)
    .map(([category]) => category);

  return {
    totalCategories: entries.length,
    notSetCount: notSetCategories.length,
    configuredCount: entries.length - notSetCategories.length,
    notSetCategories,
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

  // Monthly budget
  const monthlyAlert = buildAlert({
    status: monthlyStatus.status,
    scope: "monthly",
    prefix: "Monthly",
  });

  if (monthlyAlert) {
    alerts.push(monthlyAlert);
  }

  // Category budgets
  Object.entries(categoryStatuses).forEach(([category, status]) => {
    const categoryAlert = buildAlert({
      status: status.status,
      scope: "category",
      prefix: category,
      category,
    });

    if (categoryAlert) {
      alerts.push(categoryAlert);
    }
  });

  return alerts;
}
