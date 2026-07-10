function GeneralActionsBar({
  onLoadMore,
  processedExpenses = [],
  visibleCount,
  onClearAll,
  hasActiveFilters,
}) {
  const expenses = Array.isArray(processedExpenses) ? processedExpenses : [];

  const isEmpty = expenses.length === 0;
  const hasMore = visibleCount < expenses.length;

  let loadStatus = null;

  if (isEmpty) {
    loadStatus = <p className="empty-load-message">No expenses to load</p>;
  } else if (!hasActiveFilters && hasMore) {
    loadStatus = (
      <button type="button" className="load-more" onClick={onLoadMore}>
        Load more
      </button>
    );
  } else if (!hasActiveFilters) {
    loadStatus = <p className="empty-load-message">No more expenses exist</p>;
  }

  return (
    <section className="actions-bar">
      <div className="left">{loadStatus}</div>

      <div className="right">
        <button type="button" className="clear-all" onClick={onClearAll}>
          Clear all
        </button>
      </div>
    </section>
  );
}

export default GeneralActionsBar;
