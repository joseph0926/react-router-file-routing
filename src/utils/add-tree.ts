import { LoaderFunction } from 'react-router-dom';
import { NodeData, RouteNode } from '../types';

/**
 * 라우터 object를 트리구조에 추가하는 함수
 * @param tree 트리객체
 * @param segments 세그먼트 배열
 * @param nodeData
 */
export function addToRouteTree(
  tree: RouteNode,
  segments: string[],
  nodeData: NodeData,
) {
  let current = tree;

  /** 루트 레이아웃인지 확인 */
  const isRootLayout =
    segments.length === 1 && (segments[0] === '/' || segments[0] === '');

  /** 루트 레이아웃이면 트리의 최상위에 layoutElement를 설정 */
  if (isRootLayout && nodeData.type === 'layout') {
    tree.layoutElement = nodeData.element as React.LazyExoticComponent<
      React.ComponentType<any>
    >;
    return;
  }
  /** 루트 에러면 트리의 최상위에 errorElement를 설정 */
  if (isRootLayout && nodeData.type === 'error') {
    tree.errorElement = nodeData.element as React.LazyExoticComponent<
      React.ComponentType<any>
    >;
    return;
  }
  /** 루트 로딩이면 트리의 최상위에 loadingElement를 설정 */
  if (isRootLayout && nodeData.type === 'loading') {
    tree.loadingElement = nodeData.element as React.LazyExoticComponent<
      React.ComponentType<any>
    >;
    return;
  }
  /** 루트 loader면 트리의 최상위에 loaderFn를 설정 */
  if (isRootLayout && nodeData.type === 'loader') {
    tree.loaderFn = nodeData.element as LoaderFunction;
    return;
  }

  for (let index = 0; index < segments.length; index++) {
    let segment = segments[index];

    /** 동적 라우트 처리 */
    const isDynamic = segment.startsWith('[') && segment.endsWith(']');
    let segmentName = segment;

    if (isDynamic) {
      segmentName = segmentName.replace(/^\[|\]$/g, '').replace('...', '');
      if (segment.startsWith('[...')) {
        segmentName = '*';
      } else {
        segmentName = `:${segmentName}`;
      }
    }

    /** 그룹 폴더 감지: 괄호로 감싸진 폴더 */
    const isGroupFolder = segment.startsWith('(') && segment.endsWith(')');
    if (isGroupFolder) {
      continue;
    }

    /** 빈 문자열 세그먼트는 무시 */
    if (segmentName === '') {
      continue;
    }

    /** 현재 노드에 children 객체가 없으면 초기화 */
    if (!current.children) {
      current.children = {};
    }

    /** 세그먼트 이름으로 자식 노드가 없으면 생성 */
    if (!current.children[segmentName]) {
      current.children[segmentName] = {};
    }

    /** 현재 노드를 자식 노드로 이동 */
    current = current.children[segmentName];

    /** 마지막 세그먼트인 경우 요소 할당 */
    if (index === segments.length - 1) {
      switch (nodeData.type) {
        case 'page':
          current.pageElement = nodeData.element as React.LazyExoticComponent<
            React.ComponentType<any>
          >;
          break;
        case 'layout':
          current.layoutElement = nodeData.element as React.LazyExoticComponent<
            React.ComponentType<any>
          >;
          break;
        case 'error':
          current.errorElement = nodeData.element as React.LazyExoticComponent<
            React.ComponentType<any>
          >;
          break;
        case 'loading':
          current.loadingElement =
            nodeData.element as React.LazyExoticComponent<
              React.ComponentType<any>
            >;
          break;
        case 'loader':
          current.loaderFn = nodeData.element as LoaderFunction;
          break;
      }
    }
  }
}
