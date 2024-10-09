import React, { Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { getRoutes } from './utils/get-routes';

/**
 * 폴더/파일 기반 라우터
 * @example
 * ```jsx
 * // 엔트리 파일
 * return <FileRouter />
 * ```
 */
export function FileRouter() {
  /**
   * 파일/폴더 정보를 읽은 후 해당 라우터 정보를 모두 가져옵니다
   */
  const routes = getRoutes();

  function Routes() {
    /**
     * `useRoutes` 훅은 주어진 라우트 설정을 기반으로 해당 경로에 매칭되는 컴포넌트를 렌더링합니다.
     *
     * @function useRoutes
     * @param {RouteObject[]} routes - 각 경로와 해당 컴포넌트를 정의한 라우트 객체 배열입니다.
     *
     * @returns {React.ReactElement | null} - 매칭되는 경로가 있으면 해당 경로의 컴포넌트(React 엘리먼트)를 반환하고,
     *                                        매칭되는 경로가 없으면 null을 반환합니다.
     */
    const element = useRoutes(routes);
    return element;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading,,,</div>}>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
}
