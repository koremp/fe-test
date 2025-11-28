// src/components/board/BoardTable/BoardTableColumns.tsx
import type { ColumnHelper } from "@tanstack/react-table";
import type { Post } from "@/types/Post";

export const BoardTableColumns = (columnHelper: ColumnHelper<Post>) => [
  // title: 정렬 가능
  columnHelper.accessor("title", {
    id: "title",
    header: "제목",
    enableSorting: true,
    size: 400,
    minSize: 250,
    cell: ({ row }) => (
      <div style={{ lineHeight: 1.4 }}>
        <div style={{ fontWeight: 500, marginBottom: 4 }}>
          {row.original.title}
        </div>
        <div style={{ color: "#6b7280", fontSize: 14 }}>
          {row.original.body.length > 100
            ? `${row.original.body.slice(0, 100)}...`
            : row.original.body}
        </div>
      </div>
    ),
  }),

  // category
  columnHelper.accessor("category", {
    id: "category",
    header: "카테고리",
    size: 160,
    minSize: 120,
    cell: ({ row }) => (
      <span
        style={{
          background: "#dbeafe",
          color: "#1e40af",
          padding: "0.25rem 0.75rem",
          borderRadius: 9999,
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        {row.original.category}
      </span>
    ),
  }),

  // tags
  columnHelper.display({
    id: "tags",
    header: "태그",
    size: 260,
    minSize: 180,
    cell: ({ row }) => {
      const tags = row.original.tags || [];
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {tags.slice(0, 3).map(
            (tag, i) =>
              tag && (
                <span
                  key={i}
                  style={{
                    background: "#f3f4f6",
                    color: "#374151",
                    padding: "2px 8px",
                    borderRadius: 4,
                    fontSize: 12,
                  }}
                >
                  {tag}
                </span>
              )
          )}
          {tags.length > 3 && (
            <span style={{ color: "#6b7280", fontSize: 12 }}>
              +{tags.length - 3}
            </span>
          )}
        </div>
      );
    },
  }),

  // createdAt: 정렬 가능
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "작성일",
    enableSorting: true,
    sortingFn: "datetime",
    size: 180,
    minSize: 140,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    },
  }),
];
