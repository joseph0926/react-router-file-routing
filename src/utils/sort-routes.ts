import { RouteObject } from 'react-router-dom';

/** 라우터 우선순위 정렬
 * @param routes
 * @description 무조건 정적 라우트 > 동적 라우트
 */
export function sortRoutes(routes: RouteObject[]): void {
  routes.sort((a, b) => {
    const aPath = a.path ?? '';
    const bPath = b.path ?? '';

    const aSegments = aPath.split('/');
    const bSegments = bPath.split('/');

    const minLength = Math.min(aSegments.length, bSegments.length);

    for (let i = 0; i < minLength; i++) {
      const aSegment = aSegments[i];
      const bSegment = bSegments[i];

      const aIsDynamic = aSegment.startsWith(':') || aSegment === '*';
      const bIsDynamic = bSegment.startsWith(':') || bSegment === '*';

      if (aIsDynamic !== bIsDynamic) {
        return aIsDynamic ? 1 : -1;
      }
    }

    return aSegments.length - bSegments.length;
  });

  routes.forEach((route) => {
    if (route.children) {
      sortRoutes(route.children);
    }
  });
}
