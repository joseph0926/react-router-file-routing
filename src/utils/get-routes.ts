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
   */
  const modules = import.meta.glob('/src/pages/**/page.{jsx,tsx}');
  /**
   * pages 디렉토리의 layout.tsx 파일을 모두 가져옵니다.
   */
  const layouts = import.meta.glob('/src/pages/**/layout.{jsx,tsx}');
  /**
   * pages 디렉토리의 error.tsx 파일을 모두 가져옵니다.
   */
  const errors = import.meta.glob('/src/pages/**/error.{jsx,tsx}');
  /**
   * pages 디렉토리의 loading.tsx 파일을 모두 가져옵니다.
   */
  const loadings = import.meta.glob('/src/pages/**/loading.{jsx,tsx}');

  /** 트리 구조를 생성하기 위한 루트 노드 */
  const routeTree: RouteNode = {};

  /** 모든 {page | layout | error | loading} 파일을 순회하여 트리 구조에 추가합니다 */
  const addElementsToTree = (
    glob: Record<string, () => Promise<unknown>>,
    type: 'page' | 'layout' | 'error' | 'loading',
  ) => {
    Object.keys(glob).forEach((filePath) => {
      const pathSegments = getPathSegments(filePath);
      const element = React.lazy(glob[filePath] as any);

      addToRouteTree(routeTree, pathSegments, {
        type,
        element,
      });
    });
  };

  addElementsToTree(modules, 'page');
  addElementsToTree(layouts, 'layout');
  addElementsToTree(errors, 'error');
  addElementsToTree(loadings, 'loading');

  /** 트리 구조를 기반으로 RouteObject 배열 생성 */
  const routeObjects = buildRoutesFromTree(routeTree);

  /** 우선순위 정렬 */
  sortRoutes(routeObjects);

  return routeObjects;
}
