// src/features/board/components/BoardControls.tsx
import type { Category } from "@/types/Category";

interface BoardControlsProps {
  searchValue: string;
  selectedCategory: Category | "ALL";
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onCategoryChange: (category: Category | "ALL") => void;
}

export function BoardControls({
  searchValue,
  selectedCategory,
  onSearchChange,
  onSearchSubmit,
  onCategoryChange,
}: BoardControlsProps) {
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      onSearchSubmit();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: 16,
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="제목 또는 본문 검색..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          flex: 1,
          padding: "0.5rem 1rem",
          borderRadius: 6,
          border: "1px solid #e5e7eb",
          fontSize: 14,
        }}
      />
      <button
        type="button"
        onClick={onSearchSubmit}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: 6,
          border: "1px solid #2563eb",
          backgroundColor: "#2563eb",
          color: "#ffffff",
          fontSize: 14,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        검색
      </button>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value as Category | "ALL")}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: 6,
          border: "1px solid #e5e7eb",
          fontSize: 14,
          whiteSpace: "nowrap",
        }}
      >
        <option key="all" value="ALL">
          전체 카테고리
        </option>
        {["QNA", "NOTICE", "FREE"].map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
