export const Category = {
  notice: "NOTICE",
  qna: "QNA",
  free: "FREE",
} as const;

export type Category = (typeof Category)[keyof typeof Category];
