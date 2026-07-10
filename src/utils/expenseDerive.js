/**
 * Expense filtering, sorting, and summary-statistic helpers.
 */

// --- Search / filter / sort -------------------------------------------------

export function searchExpenses(expenses, filters) {
  const searchTerm = filters.title;

  if (!searchTerm.trim()) return expenses;

  const normalizedTerm = searchTerm.toLowerCase();

  return expenses.filter((expense) => {
    return (
      expense.title.toLowerCase().includes(normalizedTerm) ||
      expense.category.toLowerCase().includes(normalizedTerm) ||
      String(expense.amount).includes(normalizedTerm)
    );
  });
}

export function filterByMonth(expenses, filters) {
  if (filters.month === "all") return expenses;

  return expenses.filter((expense) => {
    const date = new Date(expense.date);
    return date.getMonth() + 1 === Number(filters.month);
  });
}

export function filterByDateRange(expenses, filters) {
  if (!filters.startDate && !filters.endDate) return expenses;

  const start = filters.startDate ? new Date(filters.startDate) : null;
  const end = filters.endDate ? new Date(filters.endDate) : null;

  return expenses.filter((expense) => {
    const date = new Date(expense.date);
    return (!start || date >= start) && (!end || date <= end);
  });
}

export function sortExpenses(expenses, filters) {
  const sortedExpenses = [...expenses];

  switch (filters.sortBy) {
    case "smallest":
      return sortedExpenses.sort((a, b) => a.amount - b.amount);

    case "largest":
      return sortedExpenses.sort((a, b) => b.amount - a.amount);

    case "newest":
      return sortedExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));

    case "oldest":
      return sortedExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));

    case "title-ascending":
      return sortedExpenses.sort((a, b) => a.title.localeCompare(b.title));

    case "title-descending":
      return sortedExpenses.sort((a, b) => b.title.localeCompare(a.title));

    default:
      return sortedExpenses;
  }
}

export function getUniqueCategories(expenses) {
  return [...new Set(expenses.map((expense) => expense.category))];
}

// --- Aggregate stats ---------------------------------------------------------

export function totalCalculate(expenses) {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

export function getHighestExpense(expenses) {
  if (expenses.length === 0) return 0;

  return Math.max(...expenses.map((expense) => expense.amount));
}

export function getLowestExpense(expenses) {
  if (expenses.length === 0) return 0;

  return Math.min(...expenses.map((expense) => expense.amount));
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

export function getTotalCategories(expenses) {
  const categories = new Set();

  for (const expense of expenses) {
    if (expense.category) {
      categories.add(expense.category);
    }
  }

  return categories.size;
}

// --- Period-based totals ------------------------------------------------------
//
// getExpensesToday/ThisWeek/ThisMonth/ThisYear share the same shape: filter
// expenses that fall within a date window, then sum their amounts. The
// window logic differs per period, so only the summation is shared here.

function sumAmounts(expenses) {
  return expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0,
  );
}

function isSameDay(dateA, dateB) {
  return (
    dateA.getDate() === dateB.getDate() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  );
}

export function getExpensesToday(expenses) {
  const today = new Date();

  const todaysExpenses = expenses.filter((expense) =>
    isSameDay(new Date(expense.date), today),
  );

  return sumAmounts(todaysExpenses);
}

export function getExpensesThisWeek(expenses) {
  const today = new Date();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const thisWeeksExpenses = expenses.filter((expense) => {
    const date = new Date(expense.date);
    return date >= startOfWeek && date <= today;
  });

  return sumAmounts(thisWeeksExpenses);
}

export function getExpensesThisMonth(expenses) {
  const today = new Date();

  const thisMonthsExpenses = expenses.filter((expense) => {
    const date = new Date(expense.date);
    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  });

  return sumAmounts(thisMonthsExpenses);
}

export function getExpensesThisYear(expenses) {
  const currentYear = new Date().getFullYear();

  const thisYearsExpenses = expenses.filter((expense) => {
    const date = new Date(expense.date);
    return date.getFullYear() === currentYear;
  });

  return sumAmounts(thisYearsExpenses);
}
