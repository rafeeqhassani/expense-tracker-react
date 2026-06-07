function ActionsBar({
  onLoadMore,
  filteredExpenses,
  visibleCount,
  resetFilters,
  hasActiveFilters,
  onClearSelected,
  onClearAll,
}) {
  let result;

  const isEmpty = filteredExpenses.length === 0;

  const hasMore = filteredExpenses.length > visibleCount;

  const isFullyLoaded =
    filteredExpenses.length > 0 && filteredExpenses.length <= visibleCount;

  if (isEmpty) {
    result = <p className="empty-load-message">No expenses to load</p>;
  } else if (hasMore) {
    result = (
      <button type="button" className="load-more" onClick={onLoadMore}>
        Load more
      </button>
    );
  } else if (isFullyLoaded) {
    result = <p className="empty-load-message">No more expenses exist</p>;
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
