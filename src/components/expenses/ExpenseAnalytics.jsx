import { formatCurrency } from "../../utils/expenseTransform";

function SummaryCard({ label, value = 0, className = "", type = "number" }) {
  const displayValue = type === "currency" ? formatCurrency(value) : value;

  return (
    <div className={`summary-card ${className}`}>
      <span>{label}</span>
      <h3>{displayValue}</h3>
    </div>
  );
}

const SUMMARY_CONFIG = [
  { key: "totalAmount", label: "Total", className: "total", type: "currency" },
  {
    key: "totalRecords",
    label: "Records",
    className: "records",
    type: "number",
  },
  {
    key: "highestExpense",
    label: "Highest",
    className: "highest",
    type: "currency",
  },
  {
    key: "lowestExpense",
    label: "Lowest",
    className: "lowest",
    type: "currency",
  },
  {
    key: "averageExpense",
    label: "Average",
    className: "average",
    type: "currency",
  },
  {
    key: "averageDailySpending",
    label: "Average Daily Spending",
    className: "daily",
    type: "currency",
  },
];

function SummarySection({ title, data }) {
  return (
    <div className="summary-section">
      <h3 className="summary-title">{title}</h3>

      <div className="summary">
        {SUMMARY_CONFIG.map((item) => (
          <SummaryCard
            key={`${title}-${item.key}`}
            label={item.label}
            value={data?.[item.key]}
            className={item.className}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
}

function ExpenseAnalytics({ overall = {}, filtered = {} }) {
  return (
    <>
      <SummarySection title="Overall" data={overall} />
      <SummarySection title="This Month" data={filtered} />
    </>
  );
}

export default ExpenseAnalytics;
