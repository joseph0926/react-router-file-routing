import React from 'react';
import { RouteObject } from 'react-router-dom';
import { sortRoutes } from './sort-routes';
import { RouteNode } from '../types';
import { getPathSegments } from './get-path-segments';
import { addToRouteTree } from './add-tree';
import { buildRoutesFromTree } from './build-tree';

/**
 * 파일/폴더를 읽고 해당하는 라우터를 모두 가져오는 함수입니다
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
   * pages 디렉토리의 error.tsx 파일을 모두 가져옵니다.
   * @example
   * ```js
   * {
   *  '/src/pages/home/error.tsx': () => import('/src/pages/home/error.tsx'),
   *  '/src/pages/about/error.tsx': () => import('/src/pages/about/error.tsx'),
   * }
   * ```
   */
  const errors = import.meta.glob('/src/pages/**/error.{jsx,tsx}');

  /** 트리 구조를 생성하기 위한 루트 노드 */
  const routeTree: RouteNode = {};

  /** 모든 page.tsx 파일을 순회하여 트리 구조에 추가 */
  Object.keys(modules).forEach((filePath) => {
    const pathSegments = getPathSegments(filePath);
    const element = React.lazy(modules[filePath] as any);

    addToRouteTree(routeTree, pathSegments, {
      type: 'page',
      element,
    });
  });

  /** 모든 layout.tsx 파일을 순회하여 트리 구조에 추가 */
  Object.keys(layouts).forEach((filePath) => {
    const pathSegments = getPathSegments(filePath);
    const element = React.lazy(layouts[filePath] as any);

    addToRouteTree(routeTree, pathSegments, {
      type: 'layout',
      element,
    });
  });

  /** 모든 error.tsx 파일을 순회하여 트리 구조에 추가 */
  Object.keys(errors).forEach((filePath) => {
    const pathSegments = getPathSegments(filePath);
    const element = React.lazy(errors[filePath] as any);

    addToRouteTree(routeTree, pathSegments, {
      type: 'error',
      element,
    });
  });

  /** 트리 구조를 기반으로 RouteObject 배열 생성 */
  const routeObjects = buildRoutesFromTree(routeTree);

  /** 우선순위 정렬 */
  sortRoutes(routeObjects);

  return routeObjects;
}
