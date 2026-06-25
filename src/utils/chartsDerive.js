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

export function getTrendChartData(expenses) {
  const map = {};

  for (const item of expenses) {
    const rawDate = item.date;
    const key = normalizeDate(rawDate);

    if (!map[key]) map[key] = 0;

    map[key] += item.amount;
  }

  return Object.entries(map)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([date, total]) => ({
      date,
      total,
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
