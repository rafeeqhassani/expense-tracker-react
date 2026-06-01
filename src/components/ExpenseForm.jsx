function ExpenseForm({
  categories,
  onSubmit,
  mode,
  closeForm,
  formData,
  handleChange,
  errors,
}) {
  return (
    <form className="expenseForm" onSubmit={onSubmit}>
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

        {errors.title && <small className="error">{errors.title}</small>}
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

        {errors.amount && <small className="error">{errors.amount}</small>}
      </div>

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

        {errors.category && <small className="error">{errors.category}</small>}
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

        {errors.date && <small className="error">{errors.date}</small>}
      </div>

      <div className="form-actions">
        <button type="submit" className="submitBtn">
          {mode === "add" ? "Add Expense" : "Update Expense"}
        </button>

        <button type="button" className="cancelBtn" onClick={closeForm}>
          Close Form
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
