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

interface SnackBrandsProps {
  data: SnackBrand[];
}

// (1) 바 차트
export const SnackBrandsBarChart: React.FC<SnackBrandsProps> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">
      🍫 스낵 브랜드 - 바 차트
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="share"
          fill="#8b5cf6"
          name="점유율"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// (2) 도넛 차트
export const SnackBrandsDonutChart: React.FC<SnackBrandsProps> = ({ data }) => {
  const totalShare = data.reduce((sum, item) => sum + item.share, 0);
  const pieData = data.map((item) => ({
    name: item.name,
    value: item.share,
  }));

  const COLORS = ["#8b5cf6", "#ec4899", "#f97316", "#eab308", "#10b981"];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        🍫 스낵 브랜드 - 도넛 차트
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            minAngle={15}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
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
