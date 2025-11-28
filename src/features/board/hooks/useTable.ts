// src/hooks/useTable.ts
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import type { Post } from "@/types/Post";
import type { ColumnDef } from "@tanstack/react-table";

type SortingState = Array<{ id: string; desc: boolean }>;

export function useTable({
  data,
  sorting,
  onSortingChange,
}: {
  data: Post[];
  sorting: SortingState;
  onSortingChange: (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => void;
}) {
  const columns: ColumnDef<Post>[] = [
    // 모든 컬럼 정의를 여기에 이동
    {
      accessorKey: "title",
      header: "제목",
      cell: (info) => (
        <div style={{ lineHeight: 1.4 }}>
          <div style={{ fontWeight: 500, marginBottom: "0.25rem" }}>
            {info.getValue()}
          </div>
          <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            {info.row.original.body.length > 100
              ? `${info.row.original.body.slice(0, 100)}...`
              : info.row.original.body}
          </div>
        </div>
      ),
      size: 450,
      minSize: 300,
      maxSize: 600,
      enableResizing: true,
    },
    {
      accessorKey: "category",
      header: "카테고리",
      cell: (info) => (
        <span
          style={{
            background: "#dbeafe",
            color: "#1e40af",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          {info.getValue()}
        </span>
      ),
      size: 120,
      minSize: 100,
      enableResizing: true,
    },
    {
      accessorKey: "tags",
      header: "태그",
      cell: (info) => {
        const tags = info.getValue() as string[];
        return (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.25rem",
              justifyContent: "center",
            }}
          >
            {tags.slice(0, 3).map((tag, index) =>
              tag ? (
                <span
                  key={index}
                  style={{
                    background: "#f3f4f6",
                    color: "#374151",
                    padding: "0.125rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                  }}
                >
                  {tag}
                </span>
              ) : null
            )}
            {tags.length > 3 && (
              <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                +{tags.length - 3}
              </span>
            )}
          </div>
        );
      },
      size: 250,
      minSize: 150,
      enableResizing: true,
    },
    {
      accessorKey: "createdAt",
      header: "작성일",
      cell: (info) =>
        info.getValue<Date>().toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      size: 140,
      minSize: 120,
    },
  ];

  return useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
}
