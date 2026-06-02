export function editExpense(expenses, id) {
  return expenses.find((item) => item.id === id);
}

export function validateForm(formData) {
  const validationErrors = {};

  if (!formData.title.trim()) {
    validationErrors.title = "Title is required";
  }

  if (!formData.amount || Number(formData.amount) <= 0) {
    validationErrors.amount = "Amount must be positive";
  }

  const finalCategory =
    formData.customCategory.trim() || formData.category.trim();

  if (!finalCategory) {
    validationErrors.category = "Please select or enter a category";
  }

  if (!formData.date) {
    validationErrors.date = "Date is required";
  }

  return validationErrors;
}
