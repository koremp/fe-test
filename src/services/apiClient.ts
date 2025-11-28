const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://fe-hiring-rest-api.vercel.app";

// JWT 토큰 자동 관리
const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// 기본 헤더 설정
const getDefaultHeaders = (
  extraHeaders?: Record<string, string>
): Record<string, string> => ({
  "Content-Type": "application/json",
  ...extraHeaders,
  ...(getAuthToken() && { Authorization: `Bearer ${getAuthToken()}` }),
});

// API 호출 유틸리티
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${
    endpoint.startsWith("/") ? "" : "/"
  }${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: getDefaultHeaders(options.headers as Record<string, string>),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `API 오류 [${response.status}]: ${
        errorData.message || response.statusText
      }`
    );
  }

  return response.json();
};

// GET 메서드
export const apiGet = async <T>(endpoint: string): Promise<T> => {
  return apiRequest<T>(endpoint, { method: "GET" });
};

// POST 메서드
export const apiPost = async <T>(
  endpoint: string,
  body: unknown
): Promise<T> => {
  return apiRequest<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

// PATCH 메서드
export const apiPatch = async <T>(
  endpoint: string,
  body: unknown
): Promise<T> => {
  return apiRequest<T>(endpoint, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};

// DELETE 메서드
export const apiDelete = async <T>(endpoint: string): Promise<T> => {
  return apiRequest<T>(endpoint, { method: "DELETE" });
};

// 기본 인스턴스 (권장)
const apiClient = {
  get: apiGet,
  post: apiPost,
  patch: apiPatch,
  delete: apiDelete,
};

export default apiClient;
