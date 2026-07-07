export function searchExpenses(expenses, filters) {
  const query = filters.title;

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

export function filterByMonth(expenses, filters) {
  if (filters.month === "all") return expenses;

  return expenses.filter((item) => {
    const d = new Date(item.date);
    return d.getMonth() + 1 === Number(filters.month);
  });
}

export function filterByDateRange(expenses, filters) {
  if (!filters.startDate && !filters.endDate) return expenses;

  const start = filters.startDate ? new Date(filters.startDate) : null;
  const end = filters.endDate ? new Date(filters.endDate) : null;

  return expenses.filter((item) => {
    const date = new Date(item.date);

    if (start && !end) return date >= start;
    if (!start && end) return date <= end;

    return (!start || date >= start) && (!end || date <= end);
  });
}

export function sortExpenses(expenses, filters) {
  const sorted = [...expenses];

  switch (filters.sortBy) {
    case "smallest":
      return sorted.sort((a, b) => a.amount - b.amount);

    case "largest":
      return sorted.sort((a, b) => b.amount - a.amount);

    case "newest":
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));

    case "oldest":
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));

    case "title-ascending":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case "title-descending":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

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

export function getHighestExpense(expenses) {
  if (expenses.length === 0) return 0;

  return Math.max(...expenses.map((item) => item.amount));
}

export function getLowestExpense(expenses) {
  if (expenses.length === 0) return 0;

  return Math.min(...expenses.map((item) => item.amount));
}

export function getAverageExpense(expenses) {
  if (!expenses.length) return 0;

  return totalCalculate(expenses) / expenses.length;
}

export function getActiveDays(expenses) {
  const uniqueDays = new Set();

  for (const expense of expenses) {
    uniqueDays.add(expense.date);
  }

  return uniqueDays.size;
}

export function getAverageDailySpending(expenses) {
  const totalSpent = totalCalculate(expenses);
  const activeDays = getActiveDays(expenses);

  if (activeDays === 0) return 0;

  return totalSpent / activeDays;
}

export function getExpensesToday(expenses) {
  const today = new Date();

  return expenses
    .filter((expense) => {
      const date = new Date(expense.date);

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, expense) => {
      return sum + Number(expense.amount || 0);
    }, 0);
}

export function getExpensesThisWeek(expenses) {
  const today = new Date();

  const startOfWeek = new Date(today);

  startOfWeek.setDate(today.getDate() - today.getDay());

  return expenses
    .filter((expense) => {
      const date = new Date(expense.date);

      return date >= startOfWeek && date <= today;
    })
    .reduce((sum, expense) => {
      return sum + Number(expense.amount || 0);
    }, 0);
}

export function getExpensesThisMonth(expenses) {
  const today = new Date();

  return expenses
    .filter((expense) => {
      const date = new Date(expense.date);

      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, expense) => {
      return sum + Number(expense.amount || 0);
    }, 0);
}

export function getExpensesThisYear(expenses) {
  const currentYear = new Date().getFullYear();

  return expenses
    .filter((expense) => {
      const date = new Date(expense.date);

      return date.getFullYear() === currentYear;
    })
    .reduce((sum, expense) => {
      return sum + Number(expense.amount || 0);
    }, 0);
}

export function getTotalCategories(expenses) {
  const categories = new Set();

  for (const expense of expenses) {
    if (expense.category) {
      categories.add(expense.category);
    }
  }

  return categories.size;
}
