// src/features/graph/components/SnackBrandsCharts.tsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { SnackBrand } from "../types";
import { useLegendToggle } from "../hooks/useLegendToggle";

interface Props {
  data: SnackBrand[];
}

const BAR_SERIES = [{ key: "share", label: "점유율", color: "#8b5cf6" }];

export const SnackBrandsBarChart: React.FC<Props> = ({ data }) => {
  const { activeKeys, renderLegend } = useLegendToggle(BAR_SERIES);
  const active = activeKeys.includes("share");

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        🍫 스낵 브랜드 - 바 차트
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip />
          <Legend content={renderLegend()} />
          {active && <Bar dataKey="share" fill="#8b5cf6" />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const DONUT_SERIES = [{ key: "share", label: "점유율", color: "#8b5cf6" }];

export const SnackBrandsDonutChart: React.FC<Props> = ({ data }) => {
  const { activeKeys, renderLegend } = useLegendToggle(DONUT_SERIES);
  const active = activeKeys.includes("share");
  const pieData = data.map((d) => ({ name: d.name, value: d.share }));
  const COLORS = ["#8b5cf6", "#ec4899", "#f97316", "#10b981"];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        🍫 스낵 브랜드 - 도넛 차트
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          {active && (
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          )}
          <Tooltip />
          <Legend content={renderLegend()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
