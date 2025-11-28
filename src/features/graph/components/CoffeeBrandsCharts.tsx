import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { CoffeeBrand } from "../types";

interface Props {
  data: CoffeeBrand[];
}

export const CoffeeBrandsBarChart: React.FC<Props> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold mb-4">☕ 커피 브랜드 - 바 차트</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="brand" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="popularity" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const CoffeeBrandsDonutChart: React.FC<Props> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.popularity, 0);
  const pieData = data.map((item) => ({
    name: item.brand,
    value: item.popularity,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">☕ 커피 브랜드 - 도넛 차트</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={["#10b981", "#3b82f6", "#f59e0b", "#ef4444"][index % 4]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
