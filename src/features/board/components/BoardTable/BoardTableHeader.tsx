// src/components/board/BoardTable/BoardTableHeader.tsx
import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";
import type { Post } from "@/types/Post";

interface BoardTableHeaderProps {
  table: Table<Post>;
}

export const BoardTableHeader = ({ table }: BoardTableHeaderProps) => (
  <thead
    style={{
      position: "sticky",
      top: 0,
      backgroundColor: "#f8fafc",
      zIndex: 10,
    }}
  >
    {table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <th
            key={header.id}
            style={{
              width: header.getSize(),
              padding: "1rem",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "0.75rem",
              color: "#374151",
              borderRight: "1px solid #e5e7eb",
              borderBottom: "2px solid #e5e7eb",
              position: "relative",
              backgroundColor: "#f8fafc",
            }}
          >
            {/* 정렬 토글 */}
            <div
              onClick={header.column.getToggleSortingHandler()}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: header.column.getCanSort() ? "pointer" : "default",
                userSelect: "none",
              }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              <span>
                {header.column.getIsSorted() === "asc"
                  ? " 🔼"
                  : header.column.getIsSorted() === "desc"
                  ? " 🔽"
                  : ""}
              </span>
            </div>

            {/* 컬럼 리사이즈 핸들 */}
            {header.column.getCanResize() && (
              <div
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: "100%",
                  width: "4px",
                  cursor: "col-resize",
                  userSelect: "none",
                  touchAction: "none",
                }}
              />
            )}
          </th>
        ))}
      </tr>
    ))}
  </thead>
);
