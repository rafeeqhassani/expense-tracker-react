import { normalizeDate } from "./expenseTransform";

export function getCategoryChartData(expenses) {
  const map = {};

  for (const item of expenses) {
    const key = item.category;

    if (!map[key]) map[key] = 0;

    map[key] += item.amount;
  }

  return Object.entries(map).map(([category, total]) => ({
    category,
    total,
  }));
}

export function getMonthlyTrendChartData(expenses) {
  const map = {};

  for (const item of expenses) {
    const date = new Date(item.date);

    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!map[key]) {
      map[key] = {
        total: 0,
        label: date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
      };
    }

    map[key].total += item.amount;
  }

  return Object.entries(map)
    .sort(([a], [b]) => {
      const [yearA, monthA] = a.split("-").map(Number);
      const [yearB, monthB] = b.split("-").map(Number);

      return yearA - yearB || monthA - monthB;
    })
    .map(([, value]) => ({
      month: value.label,
      total: value.total,
    }));
}

export function getPieChartData(expenses) {
  const map = {};

  for (const item of expenses) {
    const key = item.category;

    if (!map[key]) map[key] = 0;

    map[key] += item.amount;
  }

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
}
