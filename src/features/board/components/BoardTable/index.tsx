// src/components/BoardTable/index.tsx
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table";
import type {
  ColumnFiltersState,
  ColumnSizingState,
  VisibilityState,
} from "@tanstack/react-table";
import { useState, useMemo, useCallback, forwardRef } from "react";
import type { Post } from "@/types/Post";
import { BoardTableColumns } from "./BoardTableColumns";
import { BoardTableHeader } from "./BoardTableHeader";
import { BoardTableBody } from "./BoardTableBody";

const columnHelper = createColumnHelper<Post>();

type SortField = "title" | "createdAt" | null;
type SortOrder = "asc" | "desc" | null;

interface BoardTableProps {
  data: Post[];
  onSortChange?: (field: SortField, order: SortOrder) => void;
}

export const BoardTable = forwardRef<HTMLDivElement, BoardTableProps>(
  ({ data, onSortChange }, ref) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
      {}
    );

    const columns = useMemo(() => BoardTableColumns(columnHelper), []);

    const handleSortingChange = useCallback(
      (updater: SortingState | ((old: SortingState) => SortingState)) => {
        const nextSorting =
          typeof updater === "function" ? updater(sorting) : updater;

        if (onSortChange) {
          const current = nextSorting[0];
          if (!current) {
            onSortChange(null, null);
          } else {
            const field = (current.id as SortField) || null;
            const order = current.desc ? "desc" : "asc";
            onSortChange(field, order);
          }
        }

        setSorting(nextSorting);
      },
      [sorting, onSortChange]
    );

    const table = useReactTable<Post>({
      data,
      columns,
      state: {
        sorting,
        columnFilters,
        globalFilter,
        columnSizing,
        columnVisibility,
      },
      onSortingChange: handleSortingChange,
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      onColumnSizingChange: setColumnSizing,
      onColumnVisibilityChange: setColumnVisibility,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      columnResizeMode: "onChange",
      enableColumnResizing: true,
    });

    return (
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            marginBottom: 8,
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
            fontSize: 12,
            flexShrink: 0,
          }}
        >
          {table.getAllLeafColumns().map((column) => (
            <label key={column.id}>
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
                style={{ marginRight: 4 }}
              />
              {String(column.columnDef.header ?? column.id)}
            </label>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: "100%",
            overflowY: "auto",
            border: "1px solid #e5e7eb",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
            }}
          >
            <BoardTableHeader table={table} />
            <BoardTableBody table={table} />
          </table>
          <div data-table-bottom style={{ height: 1 }} />
        </div>
      </div>
    );
  }
);

BoardTable.displayName = "BoardTable";
