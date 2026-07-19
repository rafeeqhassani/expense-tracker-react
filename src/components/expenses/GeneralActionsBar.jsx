function GeneralActionsBar({
  onLoadMore,
  pagination,
  loadingMore,
  processedExpenses = [],
  onClearAll,
  hasActiveFilters,
}) {
  console.log({
    pagination,
    hasActiveFilters,
    processedExpenses: processedExpenses.length,
  });

  const expenses = Array.isArray(processedExpenses) ? processedExpenses : [];

  const isEmpty = expenses.length === 0;

  const hasMore = pagination && pagination.page < pagination.totalPages;

  let loadStatus = null;

  if (isEmpty) {
    loadStatus = <p className="empty-load-message">No expenses to load</p>;
  } else if (!hasActiveFilters && hasMore) {
    loadStatus = (
      <button
        type="button"
        className="load-more"
        onClick={onLoadMore}
        disabled={loadingMore}
      >
        {loadingMore ? "Loading..." : "Load more"}
      </button>
    );
  } else if (!hasActiveFilters && !hasMore) {
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
