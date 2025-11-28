// src/features/graph/types/index.ts

export interface CoffeeBrand {
  brand: string;
  popularity: number;
}

export interface SnackBrand {
  name: string;
  share: number;
}

export interface MoodTrend {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
}

export interface WorkoutTrend {
  week: string;
  running: number;
  cycling: number;
  stretching: number;
}
export interface CoffeeConsumption {
  team: string;
  cups: number;
  bugs: number;
  productivity: number;
}

export interface SnackImpact {
  department: string;
  snacks: number;
  meetingsMissed: number;
  morale: number;
}

export interface GraphData {
  coffeeBrands: CoffeeBrand[];
  snackBrands: SnackBrand[];
  moodTrend: MoodTrend[];
  workoutTrend: WorkoutTrend[];
  coffeeConsumption: CoffeeConsumption[];
  snackImpact: SnackImpact[];
}
