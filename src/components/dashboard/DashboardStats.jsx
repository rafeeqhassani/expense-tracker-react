import { formatCurrency } from "../../utils/formatters";

const STATS_CONFIG = [
  {
    key: "totalSpent",
    label: "Total Spending",
    type: "currency",
    className: "total",
  },
  {
    key: "monthlySpent",
    label: "This Month",
    type: "currency",
    className: "month",
  },
  {
    key: "transactions",
    label: "Transactions",
    type: "number",
    className: "records",
  },
];

function DashboardStats({ data = {} }) {
  return (
    <div className="dashboard-stats">
      {STATS_CONFIG.map((item) => (
        <div className={`summary-card ${item.className}`} key={item.key}>
          {item.label}

          <h3>
            {item.type === "currency"
              ? formatCurrency(data[item.key] ?? 0)
              : (data[item.key] ?? 0)}
          </h3>
        </div>
      ))}
    </div>
  );
}
export default DashboardStats;
