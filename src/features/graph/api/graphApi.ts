import apiClient from "@/services/apiClient";
import type {
  GraphData,
  CoffeeBrand,
  SnackBrand,
  MoodTrend,
  WorkoutTrend,
  CoffeeConsumption,
  SnackImpact,
} from "@/features/graph/types";

const GRAPH_ENDPOINTS = {
  coffeeBrands: "/mock/top-coffee-brands",
  snackBrands: "/mock/popular-snack-brands",
  moodTrend: "/mock/weekly-mood-trend",
  workoutTrend: "/mock/weekly-workout-trend",
  coffeeConsumption: "/mock/coffee-consumption",
  snackImpact: "/mock/snack-impact",
} as const;

type CoffeeConsumptionRaw = {
  teams: {
    team: string;
    series: { cups: number; bugs: number; productivity: number }[];
  }[];
};

type SnackImpactRaw = {
  departments: {
    name: string;
    metrics: { snacks: number; meetingsMissed: number; morale: number }[];
  }[];
};

export const fetchAllGraphData = async (): Promise<GraphData> => {
  const [
    coffeeBrandsRes,
    snackBrandsRes,
    moodTrendRes,
    workoutTrendRes,
    coffeeConsumptionRaw,
    snackImpactRaw,
  ] = await Promise.all([
    apiClient.get<CoffeeBrand[]>(GRAPH_ENDPOINTS.coffeeBrands),
    apiClient.get<SnackBrand[]>(GRAPH_ENDPOINTS.snackBrands),
    apiClient.get<MoodTrend[]>(GRAPH_ENDPOINTS.moodTrend),
    apiClient.get<WorkoutTrend[]>(GRAPH_ENDPOINTS.workoutTrend),
    apiClient.get<CoffeeConsumptionRaw>(GRAPH_ENDPOINTS.coffeeConsumption),
    apiClient.get<SnackImpactRaw>(GRAPH_ENDPOINTS.snackImpact),
  ]);

  const coffeeConsumption: CoffeeConsumption[] =
    coffeeConsumptionRaw.teams.flatMap((team) =>
      team.series.map((s) => ({
        team: team.team,
        cups: s.cups,
        bugs: s.bugs,
        productivity: s.productivity,
      }))
    );

  const snackImpact: SnackImpact[] = snackImpactRaw.departments.flatMap(
    (dept) =>
      dept.metrics.map((m) => ({
        department: dept.name,
        snacks: m.snacks,
        meetingsMissed: m.meetingsMissed,
        morale: m.morale,
      }))
  );

  return {
    coffeeBrands: coffeeBrandsRes,
    snackBrands: snackBrandsRes,
    moodTrend: moodTrendRes,
    workoutTrend: workoutTrendRes,
    coffeeConsumption,
    snackImpact,
  };
};
