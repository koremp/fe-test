// src/routes/graph.index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import { fetchAllGraphData } from "@/features/graph/api/graphApi";
import type { GraphData } from "@/features/graph/types";

import {
  CoffeeBrandsBarChart,
  CoffeeBrandsDonutChart,
} from "@/features/graph/components/CoffeeBrandsCharts";
import {
  SnackBrandsBarChart,
  SnackBrandsDonutChart,
} from "@/features/graph/components/SnackBrandsCharts";
import {
  MoodTrendStackedBar,
  MoodTrendStackedArea,
} from "@/features/graph/components/MoodTrendCharts";
import {
  WorkoutTrendStackedBar,
  WorkoutTrendStackedArea,
} from "@/features/graph/components/WorkoutTrendCharts";
import { CoffeeConsumptionMultiLine } from "@/features/graph/components/CoffeeConsumptionChart";
import { SnackImpactMultiLine } from "@/features/graph/components/SnackImpactChart";

export const Route = createFileRoute("/graph/")({
  component: GraphRouteComponent,
});

function GraphRouteComponent() {
  const [data, setData] = useState<GraphData>({
    coffeeBrands: [],
    snackBrands: [],
    moodTrend: [],
    workoutTrend: [],
    coffeeConsumption: [],
    snackImpact: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const allData = await fetchAllGraphData();
        setData(allData);
      } catch (err) {
        setError("그래프 데이터 로드 실패");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600 animate-pulse">
          📊 그래프 로딩 중...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-500 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            📊 데이터 시각화 대시보드
          </h1>
          <p className="text-xl text-gray-600">14개 차트 완전 구현</p>
        </div>

        {/* 1. 바/도넛 차트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <CoffeeBrandsBarChart data={data.coffeeBrands} />
          <CoffeeBrandsDonutChart data={data.coffeeBrands} />
          <SnackBrandsBarChart data={data.snackBrands} />
          <SnackBrandsDonutChart data={data.snackBrands} />
        </div>

        {/* 2. 스택 차트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MoodTrendStackedBar data={data.moodTrend} />
          <MoodTrendStackedArea data={data.moodTrend} />
          <WorkoutTrendStackedBar data={data.workoutTrend} />
          <WorkoutTrendStackedArea data={data.workoutTrend} />
        </div>

        {/* 3. 멀티라인 차트 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CoffeeConsumptionMultiLine data={data.coffeeConsumption} />
          <SnackImpactMultiLine data={data.snackImpact} />
        </div>
      </div>
    </div>
  );
}
