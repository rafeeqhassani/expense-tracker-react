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

  if (!formData.category.trim()) {
    validationErrors.category = "Category is required";
  }

  if (!formData.date) {
    validationErrors.date = "Date is required";
  }

  return validationErrors;
}
