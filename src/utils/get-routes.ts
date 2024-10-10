import React from 'react';
import { RouteObject } from 'react-router-dom';
import { formatPath } from './format-path';
import { sortRoutes } from './sort-routes';

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
export function getRoutes(): RouteObject[] {
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
  const modules = import.meta.glob('/src/pages/**/page.{jsx,tsx}');
  /**
   * pages 디렉토리의 layout.tsx 파일을 모두 가져옵니다.
   * @example
   * ```js
   * {
   *  '/src/pages/home/layout.tsx': () => import('/src/pages/home/layout.tsx'),
   *  '/src/pages/about/layout.tsx': () => import('/src/pages/about/layout.tsx'),
   * }
   * ```
   */
  const layouts = import.meta.glob('/src/pages/**/layout.{jsx,tsx}');

  /**
   * 경로별로 레이아웃과 페이지를 매핑하기 위한 객체
   * @example
   * ```js
   * {
   *   [formattedPath]: {
   *     path: string;
   *     layoutElement?: React.LazyExoticComponent<any>;
   *     pageElement?: React.LazyExoticComponent<any>;
   *   }
   * }
   * ```
   */
  const routeMap: Record<
    string,
    {
      path?: string; // 그룹 라우터(path-less route를 위한 path 옵셔널)
      layoutElement?: React.LazyExoticComponent<any>;
      pageElement?: React.LazyExoticComponent<any>;
    }
  > = {};

  /** 모든 page.tsx 파일을 순회하여 routeMap에 추가 */
  Object.keys(modules).map((filePath) => {
    /** modules의 key값인 파일/폴더 경로를 가져온 후 포멧하여 `path`로 설정합니다 */
    const path = formatPath(filePath);
    /** key값에 해당하는 `import`문을 가져와서 `lazy` 로드를 통해 엘리먼트로 반환합니다 */
    const element = React.lazy(modules[filePath] as any);

    if (!routeMap[path]) {
      routeMap[path] = {};
    }
    if (path && path !== '') {
      routeMap[path].path = path;
    }
    routeMap[path].pageElement = element;
  });

  /** 모든 layout.tsx 파일을 순회하여 routeMap에 추가 */
  Object.keys(layouts).forEach((filePath) => {
    const path = formatPath(filePath);
    const element = React.lazy(layouts[filePath] as any);

    if (!routeMap[path]) {
      routeMap[path] = {};
    }
    if (path && path !== '') {
      routeMap[path].path = path;
    }
    routeMap[path].layoutElement = element;
  });

  /** routeMap을 기반으로 RouteObject 배열 생성  */
  const routeObjects: RouteObject[] = Object.values(routeMap).map((route) => {
    const routeObject: RouteObject = {};

    /** path가 있으면 설정 */
    if (route.path) {
      routeObject.path = route.path;
    }

    /** 레이아웃과 페이지 모두 있는 경우 */
    if (route.layoutElement && route.pageElement) {
      routeObject.element = React.createElement(
        React.Suspense,
        { fallback: null },
        React.createElement(route.layoutElement),
      );
      routeObject.children = [
        {
          index: true,
          element: React.createElement(
            React.Suspense,
            { fallback: null },
            React.createElement(route.pageElement),
          ),
        },
      ];
    } else if (route.layoutElement) {
      /** 레이아웃만 있는 경우 */
      routeObject.element = React.createElement(
        React.Suspense,
        { fallback: null },
        React.createElement(route.layoutElement),
      );
    } else if (route.pageElement) {
      /** 페이지만 있는 경우 */
      routeObject.element = React.createElement(
        React.Suspense,
        { fallback: null },
        React.createElement(route.pageElement),
      );
    } else {
      /** 해당 경로에 레이아웃이나 페이지가 없는 경우 */
      routeObject.element = null;
    }

    return routeObject;
  });

  sortRoutes(routeObjects);

  return routeObjects;
}
