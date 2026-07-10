function sumAmountsByCategory(expenses) {
  const totalsByCategory = {};

  for (const expense of expenses) {
    const category = expense.category;
    totalsByCategory[category] =
      (totalsByCategory[category] || 0) + expense.amount;
  }

  return totalsByCategory;
}

export function getCategoryChartData(expenses) {
  const totalsByCategory = sumAmountsByCategory(expenses);

  return Object.entries(totalsByCategory).map(([category, total]) => ({
    category,
    total,
  }));
}

export function getPieChartData(expenses) {
  const totalsByCategory = sumAmountsByCategory(expenses);

  return Object.entries(totalsByCategory).map(([name, value]) => ({
    name,
    value,
  }));
}

export function getMonthlyTrendChartData(expenses) {
  const totalsByMonth = {};

  for (const expense of expenses) {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!totalsByMonth[monthKey]) {
      totalsByMonth[monthKey] = {
        total: 0,
        label: date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
      };
    }

    totalsByMonth[monthKey].total += expense.amount;
  }

  return Object.entries(totalsByMonth)
    .sort(([monthKeyA], [monthKeyB]) => {
      const [yearA, monthA] = monthKeyA.split("-").map(Number);
      const [yearB, monthB] = monthKeyB.split("-").map(Number);

      return yearA - yearB || monthA - monthB;
    })
    .map(([, { label, total }]) => ({
      month: label,
      total,
    }));
}
