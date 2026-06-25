import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { chartColors } from "../../utils/chartsColors";

function BarChartView({ data }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" />

        <XAxis dataKey="category" stroke={chartColors.text} />
        <YAxis stroke={chartColors.text} />

        <Tooltip />

        <Bar dataKey="total" fill={chartColors.primary} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartView;
