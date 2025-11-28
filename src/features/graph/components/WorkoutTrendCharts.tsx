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
import type { WorkoutTrend } from "../types";

interface Props {
  data: WorkoutTrend[];
}

// 스택형 바 차트
export const WorkoutTrendStackedBar: React.FC<Props> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">
      🏃 운동 추이 - 스택 바 차트
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} stackOffset="expand">
        <XAxis dataKey="week" />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value: number) => [`${value}%`, "운동 비율"]} />
        <Legend />
        <Bar dataKey="running" stackId="a" fill="#10b981" name="러닝" />
        <Bar dataKey="cycling" stackId="a" fill="#3b82f6" name="사이클" />
        <Bar dataKey="stretching" stackId="a" fill="#f59e0b" name="스트레칭" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// 스택형 면적 차트
export const WorkoutTrendStackedArea: React.FC<Props> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">
      🏃 운동 추이 - 스택 면적 차트
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} stackOffset="expand">
        <XAxis dataKey="week" />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value: number) => [`${value}%`, "운동 비율"]} />
        <Legend />
        <Area
          type="monotone"
          dataKey="running"
          stackId="a"
          stroke="#10b981"
          fill="#10b981"
          name="러닝"
        />
        <Area
          type="monotone"
          dataKey="cycling"
          stackId="a"
          stroke="#3b82f6"
          fill="#3b82f6"
          name="사이클"
        />
        <Area
          type="monotone"
          dataKey="stretching"
          stackId="a"
          stroke="#f59e0b"
          fill="#f59e0b"
          name="스트레칭"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
