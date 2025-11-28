// src/features/board/components/BoardLayout.tsx
import type { ReactNode } from "react";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute";

interface BoardLayoutProps {
  headerTitle?: string;
  children: ReactNode;
}

export function BoardLayout({ headerTitle, children }: BoardLayoutProps) {
  return (
    <ProtectedRoute>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            width: "100%",
            height: "100%",
            margin: "0 auto",
            padding: "2rem 1rem",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {headerTitle && (
            <h1
              style={{
                margin: 0,
                marginBottom: 16,
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {headerTitle}
            </h1>
          )}
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
