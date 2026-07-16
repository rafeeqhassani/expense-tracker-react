function BulkActionsBar({ selection, onClearSelected, selectedCount }) {
  const { allSelected, someSelected, handleDeselectAll, handleSelectAll } =
    selection;

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      handleSelectAll();
    } else {
      handleDeselectAll();
    }
  };

  return (
    <div className="bulk-actions-wrapper">
      <div className="bulk-action">
        <span className="selected-count">{selectedCount} selected</span>

        <button
          type="button"
          className="clear-selected"
          onClick={onClearSelected}
          disabled={selectedCount === 0}
        >
          Clear Selected
        </button>
      </div>

      <div className="global-checkbox">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(el) => {
              if (el) el.indeterminate = someSelected;
            }}
            onChange={handleSelectAllChange}
          />
          <span>Select All</span>
        </label>
      </div>
    </div>
  );
}

export default BulkActionsBar;
