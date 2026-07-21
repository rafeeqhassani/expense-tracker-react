import { useState } from "react";

import ChartRenderer from "./ChartRenderer";

const CHART_TYPES = [
  { value: "bar", label: "Bar" },
  { value: "line", label: "Line" },
  { value: "pie", label: "Pie" },
];
const DEFAULT_CHART_TYPE = "bar";

function getChartData(type, charts) {
  switch (type) {
    case "bar":
      return charts.category ?? [];

    case "line":
      return charts.monthly ?? [];

    case "pie":
      return (charts.category ?? []).map((item) => ({
        name: item.category,
        value: item.total,
      }));

    default:
      return [];
  }
}

function ExpenseCharts({ charts = {} }) {
  const [chartType, setChartType] = useState(DEFAULT_CHART_TYPE);

  const chartData = getChartData(chartType, charts);

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
