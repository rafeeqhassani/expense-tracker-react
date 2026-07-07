function GeneralActionsBar({
  onLoadMore,
  processedExpenses = [],
  visibleCount,
  onClearAll,
  hasActiveFilters,
}) {
  const list = Array.isArray(processedExpenses) ? processedExpenses : [];

  const isEmpty = list.length === 0;
  const hasMore = visibleCount < list.length;

  let result = null;

  if (isEmpty) {
    result = <p className="empty-load-message">No expenses to load</p>;
  } else if (!hasActiveFilters && hasMore) {
    result = (
      <button type="button" className="load-more" onClick={onLoadMore}>
        Load more
      </button>
    );
  } else if (!hasActiveFilters) {
    result = <p className="empty-load-message">No more expenses exist</p>;
  }

  return (
    <section className="actions-bar">
      <div className="left">{result}</div>

      <div className="right">
        <button type="button" className="clear-all" onClick={onClearAll}>
          Clear all
        </button>
      </div>
    </section>
  );
}

export default GeneralActionsBar;
