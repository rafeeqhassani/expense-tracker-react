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

        <XAxis dataKey="month" stroke={chartColors.text} />

        <YAxis stroke={chartColors.text} />

        <Tooltip labelFormatter={(label) => label} />

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
