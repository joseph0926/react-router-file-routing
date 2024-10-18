import { RouteObject } from 'react-router-dom';
import { RouteNode } from '../types';
import { wrapWithSuspense } from './suspens-wrapper';
import React from 'react';

/**
 * Creates a route object 함수
 * @param node - RouteNode
 * @param path - route의 path
 * @returns RouteObject
 */
export function createRouteObject(node: RouteNode, path?: string): RouteObject {
  const route: RouteObject = {};

  const loadingComponent = node.loadingElement
    ? React.createElement(node.loadingElement)
    : undefined;

  if (path) {
    route.path = path;
  }

  /** layout 처리 */
  if (node.layoutElement) {
    route.element = wrapWithSuspense(node.layoutElement, loadingComponent);
  }

  /** error 처리 */
  if (node.errorElement) {
    route.errorElement = wrapWithSuspense(node.errorElement, loadingComponent);
  }

  /** loader 처리 */
  if (node.loaderFn) {
    route.loader = node.loaderFn;
  }

  /** page 처리 */
  if (node.pageElement) {
    const pageElement = wrapWithSuspense(node.pageElement, loadingComponent);

    if (node.layoutElement) {
      route.children = [
        {
          index: true,
          element: pageElement,
          errorElement: route.errorElement,
          loader: route.loader,
        },
      ];
    } else {
      route.element = pageElement;
    }
  }

  return route;
}
