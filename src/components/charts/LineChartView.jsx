import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { chartColors } from "../../utils/chartsColors";

function LineChartView({ data }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" />

        <XAxis
          dataKey="date"
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })
          }
          stroke={chartColors.text}
        />

        <YAxis stroke={chartColors.text} />

        <Tooltip
          labelFormatter={(label) =>
            new Date(label).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          }
        />

        <Line
          type="monotone"
          dataKey="total"
          stroke={chartColors.primary}
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartView;
