// src/routes/board.index.tsx
import { useMemo, useEffect, useCallback, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";

import type { Post } from "@/types/Post";
import type { Category } from "@/types/Category";

import { BoardLayout } from "@/features/board/components/BoardLayout";
import { BoardHeader } from "@/features/board/components/BoardHeader";
import { BoardControls } from "@/features/board/components/BoardControls";
import { BoardTable } from "@/features/board/components/BoardTable";

export const Route = createFileRoute("/board/")({
  component: BoardIndexRoute,
});

interface PostsResponse {
  items: Post[];
  nextCursor?: string | null;
  prevCursor?: string | null;
}

function BoardIndexRoute() {
  const navigate = useNavigate();

  // 🔹 UI용 상태 (입력 값)
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategoryInput, setSelectedCategoryInput] = useState<
    Category | "ALL"
  >("ALL");

  // 🔹 실제 쿼리에 사용하는 상태 (버튼 눌렀을 때만 변경)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "ALL">(
    "ALL"
  );

  const query = useInfiniteQuery<
    PostsResponse,
    Error,
    InfiniteData<PostsResponse>,
    [string, { searchQuery: string; selectedCategory: Category | "ALL" }],
    string | undefined
  >({
    queryKey: ["posts", { searchQuery, selectedCategory }],
    queryFn: async ({ pageParam, queryKey }) => {
      const [, params] = queryKey;
      const { searchQuery, selectedCategory } = params;

      const token = localStorage.getItem("fe-test-token");
      const url = new URL("https://fe-hiring-rest-api.vercel.app/posts");

      // 커서 기반 페이지네이션: 다음 페이지는 nextCursor로 요청
      if (pageParam) {
        url.searchParams.set("nextCursor", pageParam);
      }

      url.searchParams.set("limit", "10");
      url.searchParams.set("sort", "createdAt");
      url.searchParams.set("order", "desc");

      if (searchQuery.trim()) {
        url.searchParams.set("search", searchQuery.trim());
      }
      if (selectedCategory !== "ALL") {
        url.searchParams.set("category", selectedCategory);
      }

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });

      if (!res.ok) {
        throw new Error("게시글을 불러오지 못했습니다.");
      }

      const raw = (await res.json()) as PostsResponse;

      const items = raw.items.map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt),
      })) as Post[];

      return {
        items,
        nextCursor: raw.nextCursor ?? undefined,
        prevCursor: raw.prevCursor ?? undefined,
      };
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const posts = useMemo(
    () => query.data?.pages.flatMap((page) => page.items) ?? [],
    [query.data]
  );

  const handleNewPost = useCallback(() => {
    navigate({ to: "/board/new" as const });
  }, [navigate]);

  // 🔹 검색 버튼 / Enter 눌렀을 때만 쿼리 상태 업데이트
  const handleSearchSubmit = useCallback(() => {
    setSearchQuery(searchInput);
    setSelectedCategory(selectedCategoryInput);
  }, [searchInput, selectedCategoryInput]);

  // 무한스크롤 IntersectionObserver
  useEffect(() => {
    if (!query.hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (!query.hasNextPage) return;
        if (query.isFetchingNextPage) return;
        query.fetchNextPage();
      },
      { threshold: 1 }
    );

    const target = document.querySelector("[data-table-bottom]");
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, [query]);

  if (query.error) {
    return (
      <BoardLayout>
        <BoardHeader title="게시판 목록" onNewPost={handleNewPost} />
        <div style={{ color: "red", padding: "2rem" }}>
          오류: {query.error.message}
        </div>
      </BoardLayout>
    );
  }

  if (query.isLoading && posts.length === 0) {
    return (
      <BoardLayout>
        <BoardHeader title="게시판 목록" onNewPost={handleNewPost} />
        <div style={{ padding: "2rem", textAlign: "center" }}>로딩 중...</div>
      </BoardLayout>
    );
  }

  return (
    <BoardLayout>
      <BoardHeader title="게시판 목록" onNewPost={handleNewPost} />
      <BoardControls
        searchValue={searchInput}
        selectedCategory={selectedCategoryInput}
        onSearchChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        onCategoryChange={setSelectedCategoryInput}
      />
      <div style={{ flex: 1, minHeight: 0 }}>
        <BoardTable data={posts} />
        {query.isFetchingNextPage && (
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              color: "#6b7280",
            }}
          >
            더 로드 중...
          </div>
        )}
        <div data-table-bottom style={{ height: 1 }} />
      </div>
    </BoardLayout>
  );
}
