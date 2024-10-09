import React, { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";

interface FileRouterProps {
  loadingElement?: React.ReactNode;
  errorElement?: React.ReactNode;
}

export function FileRouter({ loadingElement, errorElement }: FileRouterProps) {
  const routes = getRoutes();

  // 내부 컴포넌트에서 useRoutes 호출
  function Routes() {
    const element = useRoutes(routes);
    return element;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={loadingElement || <div>Loading...</div>}>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
}

// 라우트 정보를 생성하는 함수
function getRoutes() {
  // Vite의 import.meta.glob을 사용하여 pages 디렉토리의 page.tsx 파일을 모두 가져옵니다.
  const modules = import.meta.glob("/src/pages/**/page.{jsx,tsx}");

  const routeObjects = Object.keys(modules).map((filePath) => {
    const path = formatPath(filePath);
    const element = React.lazy(modules[filePath] as any);

    return {
      path,
      element: React.createElement(element),
    };
  });

  return routeObjects;
}

// 파일 경로를 URL 경로로 변환하는 함수
function formatPath(filePath: string): string {
  // 예시: '/src/pages/test/page.tsx' -> '/test'
  let path = filePath
    .replace(/^\/src\/pages/, "") // '/test/page.tsx'
    .replace(/\/page\.(jsx|tsx)$/, "") // '/test'
    .replace(/\[([^\]]+)\]/g, ":$1"); // 동적 라우트 처리

  if (path === "") {
    path = "/";
  }

  return path;
}
