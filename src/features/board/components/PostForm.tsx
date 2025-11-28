// src/components/board/PostForm.tsx
import { useState, useCallback } from "react";

interface PostFormProps {
  onSubmitSuccess: () => void;
}

export function PostForm({ onSubmitSuccess }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!title.trim() || !content.trim()) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }

      setIsSubmitting(true);

      try {
        const token = localStorage.getItem("fe-test-token");
        if (!token) {
          alert("로그인이 필요합니다.");
          return;
        }

        const response = await fetch(
          "https://fe-hiring-rest-api.vercel.app/posts",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title.trim(),
              content: content.trim(),
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "게시글 등록에 실패했습니다.");
        }

        // 성공 시 입력값 초기화
        setTitle("");
        setContent("");
        onSubmitSuccess();
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [title, content, onSubmitSuccess]
  );

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <div>
        <label
          style={{
            display: "block",
            marginBottom: 8,
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          제목
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          disabled={isSubmitting}
          maxLength={100}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            fontSize: 16,
            boxSizing: "border-box",
          }}
        />
      </div>

      <div>
        <label
          style={{
            display: "block",
            marginBottom: 8,
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          내용
        </label>
        <textarea
          rows={15}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          disabled={isSubmitting}
          maxLength={5000}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            fontSize: 16,
            resize: "vertical",
            boxSizing: "border-box",
            lineHeight: 1.5,
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "0.75rem 1.5rem",
            border: "1px solid #2563eb",
            borderRadius: 6,
            backgroundColor: isSubmitting ? "#9ca3af" : "#2563eb",
            color: "white",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {isSubmitting ? "등록 중..." : "등록"}
        </button>
      </div>
    </form>
  );
}
