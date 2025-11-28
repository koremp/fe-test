// src/components/board/BoardTable/BoardTableBody.tsx
import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";
import type { Post } from "@/types/Post";

interface BoardTableBodyProps {
  table: Table<Post>;
}

export const BoardTableBody = ({ table }: BoardTableBodyProps) => (
  <tbody>
    {table.getRowModel().rows.map((row) => (
      <tr key={row.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            style={{
              width: cell.column.getSize(),
              padding: "1rem",
              borderRight: "1px solid #e5e7eb",
              fontSize: "0.875rem",
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);
