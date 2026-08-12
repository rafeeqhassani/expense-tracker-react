import { formatCurrency } from "../../utils/formatters";

function SummaryCard({ label, value = 0, className = "", type = "number" }) {
  const displayValue = type === "currency" ? formatCurrency(value) : value;

  return (
    <div className={`summary-card ${className}`}>
      <span>{label}</span>
      <h3>{displayValue}</h3>
    </div>
  );
}

const OVERALL_CONFIG = [
  {
    key: "totalAmount",
    label: "Total Spending",
    className: "total",
    type: "currency",
  },
  {
    key: "totalRecords",
    label: "Transactions",
    className: "records",
    type: "number",
  },
  {
    key: "averageExpense",
    label: "Average Expense",
    className: "average",
    type: "currency",
  },
];

const MONTH_CONFIG = [
  {
    key: "totalAmount",
    label: "Monthly Spending",
    className: "total",
    type: "currency",
  },
  {
    key: "totalRecords",
    label: "Transactions",
    className: "records",
    type: "number",
  },
  {
    key: "averageDailySpending",
    label: "Avg. Daily Spend",
    className: "average",
    type: "currency",
  },
];

function SummarySection({ title, data, config }) {
  return (
    <section className="summary-section">
      <h3>{title}</h3>

      <div className="summary">
        {config.map((item) => (
          <SummaryCard
            key={`${title}-${item.key}`}
            label={item.label}
            value={data?.[item.key]}
            className={item.className}
            type={item.type}
          />
        ))}
      </div>
    </section>
  );
}

function ExpenseAnalytics({ overall = {}, filtered = {} }) {
  return (
    <div className="analytics-summary">
      <SummarySection title="All Time" data={overall} config={OVERALL_CONFIG} />

      <SummarySection
        title="This Month"
        data={filtered}
        config={MONTH_CONFIG}
      />
    </div>
  );
}
export default ExpenseAnalytics;
