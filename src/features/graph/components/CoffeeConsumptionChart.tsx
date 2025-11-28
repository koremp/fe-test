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

import type { CoffeeConsumption } from "../types";

interface Props {
  data: CoffeeConsumption[];
}

export const CoffeeConsumptionMultiLine: React.FC<Props> = ({ data }) => {
  const COLORS: Record<string, string> = {
    Frontend: "#10b981",
    Backend: "#3b82f6",
    AI: "#f59e0b",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">☕ 커피 소비 멀티라인 차트</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cups" name="커피 잔수" />
          <YAxis yAxisId="left" orientation="left" stroke="#ef4444" />
          <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
          <Tooltip />
          <Legend />
          {Object.entries(COLORS).map(([team, color]) => (
            <>
              <Line
                key={`${team}-bugs`}
                yAxisId="left"
                type="monotone"
                dataKey={(d: CoffeeConsumption) =>
                  d.team === team ? d.bugs : null
                }
                name={`${team} 버그`}
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
              <Line
                key={`${team}-productivity`}
                yAxisId="right"
                type="monotone"
                dataKey={(d: CoffeeConsumption) =>
                  d.team === team ? d.productivity : null
                }
                name={`${team} 생산성`}
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
