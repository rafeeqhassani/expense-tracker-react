export function filterByMonth(expenses, month) {
  return expenses.filter((item) => {
    const d = new Date(item.date);

    return d.getMonth() + 1 === month;
  });
}

export function searchExpenses(expenses, searchExpense) {
  const inputText = searchExpense.trim().toLowerCase();

  return expenses.filter((expense) => {
    return expense.title.toLowerCase().includes(inputText);
  });
}

export function sortExpenses(expenses, sortBy) {
  const sorted = [...expenses];

  switch (sortBy) {
    case "smallest":
      return sorted.sort((a, b) => a.amount - b.amount);

    case "largest":
      return sorted.sort((a, b) => b.amount - a.amount);

    case "title-ascending":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case "title-descending":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    case "newest":
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));

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
