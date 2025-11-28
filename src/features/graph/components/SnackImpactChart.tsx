// src/features/graph/components/SnackImpactChart.tsx
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import type { SnackImpact } from "../types";

interface Props {
  data: SnackImpact[];
}

export const SnackImpactMultiLine: React.FC<Props> = ({ data }) => {
  const COLORS: Record<string, string> = {
    Marketing: "#10b981",
    Sales: "#3b82f6",
    HR: "#f59e0b",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        🍪 스낵 영향도 멀티라인 차트
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="snacks" name="스낵 수" />
          <YAxis yAxisId="left" orientation="left" stroke="#ef4444" />
          <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
          <Tooltip />
          <Legend />
          {Object.entries(COLORS).map(([dept, color]) => (
            <>
              <Line
                key={`${dept}-missed`}
                yAxisId="left"
                type="monotone"
                dataKey={(d: SnackImpact) =>
                  d.department === dept ? d.meetingsMissed : null
                }
                name={`${dept} 회의불참`}
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
              <Line
                key={`${dept}-morale`}
                yAxisId="right"
                type="monotone"
                dataKey={(d: SnackImpact) =>
                  d.department === dept ? d.morale : null
                }
                name={`${dept} 사기`}
                stroke={color}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
            </>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
