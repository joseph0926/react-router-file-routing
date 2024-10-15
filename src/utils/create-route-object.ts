import { RouteObject } from 'react-router-dom';
import { RouteNode } from '../types';
import { wrapWithSuspense } from './suspens-wrapper';

/**
 * Creates a route object 함수
 * @param node - RouteNode
 * @param path - route의 path
 * @returns RouteObject
 */
export function createRouteObject(node: RouteNode, path?: string): RouteObject {
  const route: RouteObject = {};

  if (path) {
    route.path = path;
  }

  /** layout 처리 */
  if (node.layoutElement) {
    route.element = wrapWithSuspense(node.layoutElement);
  }

  /** error 처리 */
  if (node.errorElement) {
    route.errorElement = wrapWithSuspense(node.errorElement);
  }

  /** page 처리 */
  if (node.pageElement) {
    const pageElement = wrapWithSuspense(node.pageElement);

    if (node.layoutElement) {
      route.children = [
        {
          index: true,
          element: pageElement,
          errorElement: route.errorElement,
        },
      ];
    } else {
      route.element = pageElement;
    }
  }

  return route;
}
