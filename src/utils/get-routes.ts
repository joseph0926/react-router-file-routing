import React from "react";
import { formatPath } from "./format-path";
import { RouteObject } from "react-router-dom";

/**
 * 파일/폴더를 읽고 해당하는 라우터를 모두 가져오는 함수입니다
 * @returns 
 * ```ts
 * {
      path: string;
      element: React.FunctionComponentElement<any>;
    }[]
 * ```
 */
export function getRoutes() {
  /**
   * pages 디렉토리의 page.tsx 파일을 모두 가져옵니다.
   * @example
   * ```js
   * {
   *  '/src/pages/home/page.tsx': () => import('/src/pages/home/page.tsx'),
   *  '/src/pages/about/page.tsx': () => import('/src/pages/about/page.tsx'),
   * }
   * ```
   */
  const modules = import.meta.glob("/src/pages/**/page.{jsx,tsx}");

  /**
   * `react-router`에 주입할 `routeObject`를 생성합니다
   * @returns
   * ```js
   * { path: '/<path>', element: <Component /> }
   * ```
   */
  const routeObjects: RouteObject[] = Object.keys(modules).map((filePath) => {
    /** modules의 key값인 파일/폴더 경로를 가져온 후 포멧하여 `path`로 설정합니다 */
    const path = formatPath(filePath);
    /** key값에 해당하는 `import`문을 가져와서 `lazy` 로드를 통해 엘리먼트로 반환합니다 */
    const element = React.lazy(modules[filePath] as any);

    return {
      path,
      element: React.createElement(element),
    };
  });

  return routeObjects;
}
