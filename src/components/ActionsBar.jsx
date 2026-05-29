function ActionsBar({
  onLoadMore,
  hasMoreExpenses,
  hasExpenses,
  onClearSelected,
  onClearAll,
}) {
  let result;

  if (!hasExpenses) {
    result = <p className="empty">No expenses to load</p>;
  } else if (hasMoreExpenses) {
    result = (
      <button type="button" className="loadMore" onClick={onLoadMore}>
        Load More Expenses
      </button>
    );
  } else {
    result = <p className="message">All expenses loaded</p>;
  }

  return (
    <section className="actions-bar">
      <div className="button-group">
        {result}

        <button
          type="button"
          className="clearSelected"
          onClick={onClearSelected}
        >
          Clear Selected
        </button>

        <button type="button" className="clearAll" onClick={onClearAll}>
          Clear All
        </button>
      </div>
    </section>
  );
}
export default ActionsBar;
