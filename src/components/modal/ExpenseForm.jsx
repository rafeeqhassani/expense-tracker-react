function ExpenseForm({
  categories,
  onSubmit,
  mode,
  closeForm,
  formData,
  handleChange,
  errors,
  submitAttempted,
  touched,
}) {

  const showError = (field) =>
    (submitAttempted || touched[field]) && errors[field];

  return (
    <form className="expense-form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="title">Title</label>

        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="title-input"
          placeholder="Add Expense"
        />

        {showError("title") && (
          <small className="validate-title">{errors.title}</small>
        )}
      </div>

      <div className="field">
        <label htmlFor="amount">Amount</label>

        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="amount-input"
          placeholder="e.g. 100.00"
        />

        {showError("amount") && (
          <small className="validate-amount">{errors.amount}</small>
        )}
      </div>

      <div className="category-field">
        <div className="input-group">
          <div className="field">
            <label htmlFor="selectCategory">Select Category</label>

            <select
              id="selectCategory"
              name="category"
              className="select-category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="categoryInput">Category</label>

            <input
              type="text"
              id="categoryInput"
              name="customCategory"
              value={formData.customCategory}
              onChange={handleChange}
              className="category-input"
              placeholder="Add New Category"
            />
          </div>
        </div>

        {showError("category") && (
          <small className="validate-category">{errors.category}</small>
        )}
      </div>

      <div className="field">
        <label htmlFor="dateInput">Date</label>

        <input
          type="date"
          id="dateInput"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="date-input"
        />

        {showError("date") && (
          <small className="validate-date">{errors.date}</small>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-button">
          {mode === "add" ? "Add Expense" : "Update Expense"}
        </button>

        <button type="button" className="close-form" onClick={closeForm}>
          Close
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
