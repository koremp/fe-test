import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { z, ZodError } from "zod";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

const loginSchema = z.object({
  email: z.email("올바른 이메일 주소를 입력하세요"),
  password: z.string().min(1, "비밀번호를 입력하세요"),
});

type LoginRequest = z.infer<typeof loginSchema>;
type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

async function loginFn(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(
    "https://fe-hiring-rest-api.vercel.app/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    if (response.status === 400) throw new Error("잘못된 요청 형식입니다");
    if (response.status === 401)
      throw new Error("이메일 또는 비밀번호가 올바르지 않습니다");
    throw new Error("로그인에 실패했습니다");
  }

  return response.json();
}

function RouteComponent() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("fe-test-token");
    if (token) {
      router.navigate({ to: "/" });
    }
  }, [router]);

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem("fe-test-token", data.token);
      setSuccess("로그인되었습니다! 이동 중입니다...");
      setTimeout(() => {
        router.navigate({ to: "/" });
      }, 1500);
    },
    onError: (err: Error) => {
      setError(err.message);
      setSuccess("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const validatedData = loginSchema.parse({
        email: id.trim(),
        password: password.trim(),
      });
      loginMutation.mutate(validatedData);
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        setError(validationError.errors[0].message);
      } else {
        setError("입력값을 확인해주세요");
      }
    }
  };

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    if (error) setError("");
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="email"
            value={id}
            onChange={handleChangeId}
            placeholder="이메일"
            disabled={loginMutation.isPending}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="password"
            value={password}
            onChange={handleChangePassword}
            placeholder="비밀번호"
            disabled={loginMutation.isPending}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        {error && (
          <div
            style={{
              color: "#ef4444",
              background: "#fef2f2",
              padding: "0.75rem",
              borderRadius: "4px",
              marginBottom: "1rem",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              color: "#10b981",
              background: "#ecfdf5",
              padding: "0.75rem",
              borderRadius: "4px",
              marginBottom: "1rem",
            }}
          >
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending || !id.trim() || !password.trim()}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: loginMutation.isPending ? "#d1d5db" : "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loginMutation.isPending ? "not-allowed" : "pointer",
          }}
        >
          {loginMutation.isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
