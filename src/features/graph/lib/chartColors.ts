// src/lib/chartColors.ts
export const getChartColor = (index: number) =>
  `hsl(${(index * 55) % 360}, 70%, 55%)`;
