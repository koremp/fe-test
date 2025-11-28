// src/routes/__root.tsx
import { Outlet, Link, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 상단 네비게이션 */}
      <header className="border-b bg-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-semibold text-gray-800 hover:text-blue-600"
          >
            FE Test
          </Link>
          <div className="flex gap-4 text-sm font-medium">
            <Link to="/board" className="text-gray-600 hover:text-blue-600">
              게시판
            </Link>
            <Link to="/graph" className="text-gray-600 hover:text-blue-600">
              그래프
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-blue-600">
              로그인
            </Link>
          </div>
        </nav>
      </header>

      {/* 페이지 컨텐츠 */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
