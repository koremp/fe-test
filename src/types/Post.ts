export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: "NOTICE" | "QNA" | "FREE";
  tags: string[];
  createdAt: Date;
}
