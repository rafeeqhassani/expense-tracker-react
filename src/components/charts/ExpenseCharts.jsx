import { useState } from "react";
import {
  getCategoryChartData,
  getMonthlyTrendChartData,
  getPieChartData,
} from "../../utils/chartsDerive";
import ChartRenderer from "./ChartRenderer";

const CHART_TYPES = [
  { value: "bar", label: "Bar" },
  { value: "line", label: "Line" },
  { value: "pie", label: "Pie" },
];
const DEFAULT_CHART_TYPE = "bar";

function getChartData(type, expenses) {
  switch (type) {
    case "bar":
      return getCategoryChartData(expenses);

    case "line":
      return getMonthlyTrendChartData(expenses);

    case "pie":
      return getPieChartData(expenses);

    default:
      return [];
  }
}

function ExpenseCharts({ expenses }) {
  const [chartType, setChartType] = useState(DEFAULT_CHART_TYPE);

  const chartData = getChartData(chartType, expenses);

  return (
    <section className="charts-section">
      <div className="chart-controls">
        {CHART_TYPES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={chartType === value ? "active" : ""}
            onClick={() => setChartType(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="chart-content">
        <ChartRenderer type={chartType} data={chartData} />
      </div>
    </section>
  );
}

export default ExpenseCharts;
