import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
  const routes = React.useMemo(() => getRoutes(), []);

  const router = React.useMemo(() => createBrowserRouter(routes), [routes]);

  return <RouterProvider router={router} />;
}
