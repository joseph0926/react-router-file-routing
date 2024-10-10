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

  segments.forEach((segment, index) => {
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

    /** 그룹 폴더는 경로에 포함되지 않으므로 빈 문자열로 처리 */
    if (segmentName === '') {
      segmentName = '';
    }

    if (!current.children) {
      current.children = {};
    }

    if (!current.children[segmentName]) {
      current.children[segmentName] = {};
    }

    current = current.children[segmentName];

    /** 마지막 세그먼트인 경우 요소 할당 */
    if (index === segments.length - 1) {
      if (nodeData.type === 'page') {
        current.pageElement = nodeData.element;
      } else if (nodeData.type === 'layout') {
        current.layoutElement = nodeData.element;
      }
    }
  });
}
