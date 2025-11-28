## 프로젝트 실행 방법

- 패키지 설치
  - pnpm install
- 개발 서버 실행
  - pnpm dev
- 브라우저에서 접속
  - http://localhost:5173 (Vite 기본 포트 기준)

필요시 환경 변수(.env):
- VITE_API_BASE_URL=https://fe-hiring-rest-api.vercel.app

## 사용한 기술 스택

- 프레임워크·언어
  - React 18
  - TypeScript
  - Vite
- 라우팅
  - TanStack Router (파일 기반 라우팅, /routes/*.tsx)
- 스타일링
  - Tailwind CSS
- 상태·데이터
  - React Hooks (useState, useEffect)
  - 커스텀 API 클라이언트 (src/services/apiClient.ts)
- 데이터 시각화
  - Recharts (BarChart, PieChart, AreaChart, LineChart 등)
- 기타
  - pnpm (패키지 매니저)

## 주요 구현 기능 요약
- 게시판 CRUD
  - 로그인 후 게시글 목록 조회, 상세 보기
  - 게시글 작성, 수정, 삭제
  - 페이지네이션 및 검색/필터링
- 서버 Mock API 연동 (/posts, /posts/:id 등)
- 인증
  - 로그인 폼 및 서버 인증 API 연동
  - 발급된 JWT 토큰을 localStorage/sessionStorage에 저장
  - apiClient에서 Authorization 헤더 자동 첨부
- 공용 API 클라이언트
  - src/services/apiClient.ts
  - GET / POST / PATCH / DELETE 공통 래퍼
  - 기본 URL, 공통 헤더, 에러 메시지 처리 일원화
- 그래프 대시보드 (/graph)
  - Mock 차트 API 6종 연동
    - 커피 브랜드 / 스낵 브랜드 상위 랭킹
    - 주간 기분 추이 / 운동 추이
    - 커피 소비 vs 버그·생산성
    - 스낵 섭취 vs 회의 불참·팀 사기
  - 총 14개 차트 구현
    - Bar + Donut (브랜드)
    - Stacked Bar + Stacked Area (기분·운동)
    - Multi Line (커피 소비, 스낵 영향도)
  - Recharts 툴팁, 범례, 반응형 컨테이너 적용
  - 복잡한 응답 구조(teams / departments)를 평탄화하여 멀티라인 차트에 맞는 구조로 변환
- UI/UX
  - 반응형 레이아웃(Tailwind Grid/Flex)으로 데스크톱·모바일 대응
  - 로딩/에러 상태 UI
  - 메인 레이아웃에서 상단 네비게이션과 콘텐츠 영역 분리, 스크롤 처리 개선 (body 기본 스크롤, 페이지별 레이아웃 조정)