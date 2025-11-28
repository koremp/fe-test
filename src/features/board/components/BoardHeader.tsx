// src/features/board/components/BoardHeader.tsx
interface BoardHeaderProps {
  title?: string;
  onNewPost?: () => void;
}

export function BoardHeader({ title = "게시판", onNewPost }: BoardHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{title}</h1>
      {onNewPost && (
        <button
          onClick={onNewPost}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: 6,
            border: "1px solid #2563eb",
            backgroundColor: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          새 글 작성
        </button>
      )}
    </div>
  );
}
