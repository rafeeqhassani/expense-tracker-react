export function filterByMonth(expenses, month) {
  return expenses.filter((item) => {
    const d = new Date(item.date);

    return d.getMonth() + 1 === month;
  });
}

export function searchExpenses(expenses, query) {
  if (!query.trim()) return expenses;

  const q = query.toLowerCase();

  return expenses.filter((item) => {
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      String(item.amount).includes(q)
    );
  });
}

export const SORT_OPTIONS = {
  SMALLEST: "smallest",
  LARGEST: "largest",
  NEWEST: "newest",
  OLDEST: "oldest",
  TITLE_ASC: "title-ascending",
  TITLE_DESC: "title-descending",
};

export function sortExpenses(expenses, sortBy) {
  const sorted = [...expenses];

  switch (sortBy) {
    case SORT_OPTIONS.SMALLEST:
      return sorted.sort((a, b) => a.amount - b.amount);

    case SORT_OPTIONS.LARGEST:
      return sorted.sort((a, b) => b.amount - a.amount);

    case SORT_OPTIONS.TITLE_ASC:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case SORT_OPTIONS.TITLE_DESC:
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    case SORT_OPTIONS.NEWEST:
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));

    case SORT_OPTIONS.OLDEST:
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));

    default:
      return sorted;
  }
}

export function getUniqueCategories(expenses) {
  return [...new Set(expenses.map((e) => e.category))];
}

export function totalCalculate(data) {
  return data.reduce((sum, item) => sum + item.amount, 0);
}
