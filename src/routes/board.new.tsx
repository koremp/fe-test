// src/routes/board.new.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BoardLayout } from "@/features/board/components/BoardLayout";
import { PostForm } from "@/features/board/components/PostForm";

export const Route = createFileRoute("/board/new")({
  component: BoardNewRoute,
});

function BoardNewRoute() {
  const navigate = useNavigate();

  const handleSubmitSuccess = () => {
    navigate({ to: "/board" });
  };

  const handleCancel = () => {
    navigate({ to: "/board" });
  };

  return (
    <BoardLayout>
      <div
        style={{
          maxWidth: 720,
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* 제목 영역 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 600,
              color: "#111827",
            }}
          >
            새 글 작성
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: "#6b7280",
            }}
          >
            제목, 내용, 카테고리를 입력하고 게시글을 등록하세요.
          </p>
        </div>

        {/* 카드 형태의 폼 컨테이너 */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            boxShadow:
              "0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.06)",
            padding: "1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <PostForm onSubmitSuccess={handleSubmitSuccess} />

          {/* 하단 액션 영역 */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 8,
            }}
          >
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: "0.6rem 1.3rem",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
                color: "#374151",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </BoardLayout>
  );
}
