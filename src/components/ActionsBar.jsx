function ActionsBar({
  onLoadMore,
  hasMoreExpenses,
  hasExpenses,
  resetFilters,
  hasActiveFilters,
  onClearSelected,
  onClearAll,
}) {
  let result;

  if (!hasExpenses) {
    result = <p className="empty-load-message">No expenses to load</p>;
  } else if (hasMoreExpenses) {
    result = (
      <button type="button" className="load-more" onClick={onLoadMore}>
        Load more
      </button>
    );
  } else {
    result = <p className="empty-load-message">No more data exist</p>;
  }

  return (
    <section className="actions-bar">
      <div className="left">{result}</div>
      <div className="right">
        {hasActiveFilters && (
          <button
            type="button"
            className="clear-filtered"
            onClick={resetFilters}
          >
            Clear filtered
          </button>
        )}
        <button
          type="button"
          className="clear-selected"
          onClick={onClearSelected}
        >
          Clear selected
        </button>

        <button type="button" className="clear-all" onClick={onClearAll}>
          Clear all
        </button>
      </div>
    </section>
  );
}
export default ActionsBar;
