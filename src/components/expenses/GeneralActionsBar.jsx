function GeneralActionsBar({
  onLoadMore,
  pagination,
  loadingMore,
  onClearAll,
}) {
  const hasMore = pagination?.hasMore && onLoadMore;

  return (
    <section className="general-actions-bar">
      <div className="left">
        {hasMore && (
          <button
            type="button"
            className="load-more"
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        )}
      </div>

      <div className="right">
        <button type="button" className="clear-all" onClick={onClearAll}>
          Clear All
        </button>
      </div>
    </section>
  );
}

export default GeneralActionsBar;
