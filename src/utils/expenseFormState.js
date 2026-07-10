export function editExpense(expenses, id) {
  return expenses.find((expense) => expense.id === id && !expense.deleted);
}

export function validateForm(formData) {
  const errors = {};

  if (!formData.title.trim()) {
    errors.title = "Title is required";
  } else if (!isNaN(formData.title)) {
    errors.title = "Title cannot be a number";
  }

  if (!formData.amount || Number(formData.amount) <= 0) {
    errors.amount = "Amount must be positive";
  }

  const finalCategory =
    formData.customCategory.trim() || formData.category.trim();

  if (!finalCategory) {
    errors.category = "Please select or enter a category";
  } else if (!isNaN(finalCategory)) {
    errors.category = "Category cannot be a number";
  }

  if (!formData.date) {
    errors.date = "Date is required";
  }

  return errors;
}
