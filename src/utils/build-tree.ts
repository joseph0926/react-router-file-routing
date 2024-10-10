import { RouteObject } from 'react-router-dom';
import { RouteNode } from '../types';
import React from 'react';

/**
 * 트리구조를 라우터 형태로 변경하는 함수
 * @param node
 * @param parentPath
 * @returns
 */
export function buildRoutesFromTree(
  node: RouteNode,
  parentPath = '',
): RouteObject[] {
  const routes: RouteObject[] = [];

  const route: RouteObject = {};

  /** 현재 노드의 경로 설정 */
  if (parentPath !== '') {
    route.path = parentPath;
  }

  /** 레이아웃 요소 설정 */
  if (node.layoutElement) {
    route.element = React.createElement(
      React.Suspense,
      { fallback: null },
      React.createElement(node.layoutElement),
    );
  }

  /** 페이지 요소 설정 (레이아웃과 함께 있을 때는 인덱스 라우트로 추가) */
  if (node.pageElement) {
    const pageElement = React.createElement(
      React.Suspense,
      { fallback: null },
      React.createElement(node.pageElement),
    );

    if (node.layoutElement) {
      /** 레이아웃이 있는 경우, 자식으로 인덱스 라우트 추가 */
      if (!route.children) {
        route.children = [];
      }
      route.children.push({
        index: true,
        element: pageElement,
      });
    } else {
      /** 레이아웃이 없는 경우, 현재 라우트에 페이지 요소 설정 */
      route.element = pageElement;
    }
  }

  /** 자식 노드 처리 */
  if (node.children) {
    const childRoutes: RouteObject[] = [];

    for (const childSegment in node.children) {
      const childNode = node.children[childSegment];
      const childRoutePath = childSegment; // 경로 세그먼트

      const childRoutesFromNode = buildRoutesFromTree(
        childNode,
        childRoutePath,
      );
      childRoutes.push(...childRoutesFromNode);
    }

    if (node.layoutElement) {
      /** 레이아웃이 있는 경우, 자식 라우트를 route.children에 추가 */
      if (!route.children) {
        route.children = [];
      }
      route.children.push(...childRoutes);
    } else {
      /** 레이아웃이 없는 경우, 현재 라우트의 자식으로 추가 */
      routes.push(...childRoutes);
    }
  }

  routes.push(route);

  return routes;
}
