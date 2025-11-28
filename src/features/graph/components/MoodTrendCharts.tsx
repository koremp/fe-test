import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import type { MoodTrend } from "../types";

interface Props {
  data: MoodTrend[];
}

export const MoodTrendStackedBar: React.FC<Props> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold mb-4">😊 기분 추이 - 스택 바 차트</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} stackOffset="expand">
        <XAxis dataKey="week" />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value: number) => [`${value}%`, "비율"]} />
        <Legend />
        <Bar dataKey="happy" stackId="a" fill="#10b981" />
        <Bar dataKey="tired" stackId="a" fill="#f59e0b" />
        <Bar dataKey="stressed" stackId="a" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const MoodTrendStackedArea: React.FC<Props> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold mb-4">
      😊 기분 추이 - 스택 면적 차트
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} stackOffset="expand">
        <XAxis dataKey="week" />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value: number) => [`${value}%`, "비율"]} />
        <Legend />
        <Area
          type="monotone"
          dataKey="happy"
          stackId="a"
          stroke="#10b981"
          fill="#10b981"
        />
        <Area
          type="monotone"
          dataKey="tired"
          stackId="a"
          stroke="#f59e0b"
          fill="#f59e0b"
        />
        <Area
          type="monotone"
          dataKey="stressed"
          stackId="a"
          stroke="#ef4444"
          fill="#ef4444"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
