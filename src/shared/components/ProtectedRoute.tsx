// src/components/ProtectedRoute.tsx
import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

async function checkAuth() {
  const token = localStorage.getItem("fe-test-token");
  if (!token) throw new Error("로그인이 필요합니다");
  return token;
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {
    data: token,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5분 캐싱
  });

  useEffect(() => {
    if (error) {
      localStorage.removeItem("fe-test-token");
      router.navigate({ to: "/login" });
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.2rem",
        }}
      >
        인증 확인 중...
      </div>
    );
  }

  if (!token) return null;

  return <>{children}</>;
}
