function GeneralActionsBar({
  onLoadMore,
  pagination,
  loadingMore,
  onClearAll,
}) {
  const hasMore = pagination && pagination.page < pagination.totalPages;

  let loadStatus = null;

  if (!pagination) {
    loadStatus = null;
  } else if (hasMore) {
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
  } else {
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
