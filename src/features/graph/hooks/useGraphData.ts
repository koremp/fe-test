import { useState, useEffect } from "react";
import { fetchGraphData } from "../api/graphApi";
import { GraphData } from "../types";

export const useGraphData = () => {
  const [data, setData] = useState<GraphData>({
    coffeeBrands: [],
    moodTrends: [],
    workoutTrends: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [coffee, mood, workout] = await Promise.all([
          fetchGraphData("coffee"),
          fetchGraphData("mood"),
          fetchGraphData("workout"),
        ]);
        setData({
          coffeeBrands: coffee,
          moodTrends: mood,
          workoutTrends: workout,
        });
      } catch (err) {
        setError("그래프 데이터를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return { data, loading, error };
};
