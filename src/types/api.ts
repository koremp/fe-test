import type { Post } from "./Post";

export interface PostListResponse {
  items: Post[];
  nextCursor?: string;
  prevCursor?: string;
}

export interface LoginResponse {
  token: string;
  user: { id: string; email: string };
}

export interface PostCreateRequest {
  title: string;
  body: string;
  category: "NOTICE" | "QNA" | "FREE";
  tags: string[];
}
