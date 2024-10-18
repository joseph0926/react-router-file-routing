import { RouteObject } from 'react-router-dom';
import { RouteNode } from '../types';
import { createRouteObject } from './create-route-object';
import { wrapWithSuspense } from './suspens-wrapper';
import React from 'react';

/**
 * 트리 구조를 route object로 변경하는 함수
 * @param node - RouteNode
 * @param parentPath - 상위 path
 * @returns RouteObject[]
 */
export function buildRoutesFromTree(
  node: RouteNode,
  parentPath: string = '',
): RouteObject[] {
  /** 최상위 루트에 layout이 존재하는 경우 */
  if (parentPath === '' && node.layoutElement) {
    const rootRoute: RouteObject = createRouteObject(node, '/');

    const childRoutes: RouteObject[] = [];

    const loadingComponent = node.loadingElement
      ? React.createElement(node.loadingElement)
      : undefined;

    const loaderFn = node.loaderFn ? node.loaderFn : undefined;

    if (node.pageElement) {
      childRoutes.push({
        index: true,
        element: wrapWithSuspense(node.pageElement, loadingComponent),
        errorElement: node.errorElement
          ? wrapWithSuspense(node.errorElement)
          : undefined,
        loader: loaderFn,
      });
    }

    if (node.children) {
      for (const childSegment in node.children) {
        const childNode = node.children[childSegment];
        const childRoutesFromNode = buildRoutesFromTree(
          childNode,
          childSegment,
        );
        childRoutes.push(...childRoutesFromNode);
      }
    }

    rootRoute.children = childRoutes;
    return [rootRoute];
  }

  const routes: RouteObject[] = [];
  const route = createRouteObject(node, parentPath || undefined);

  if (node.children) {
    const childRoutes: RouteObject[] = [];

    for (const childSegment in node.children) {
      const childNode = node.children[childSegment];
      const childRoutesFromNode = buildRoutesFromTree(childNode, childSegment);
      childRoutes.push(...childRoutesFromNode);
    }

    if (node.layoutElement) {
      route.children = route.children || [];
      route.children.push(...childRoutes);
    } else {
      routes.push(...childRoutes);
    }
  }

  routes.push(route);
  return routes;
}
