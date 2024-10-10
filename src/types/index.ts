export type RouteNode = {
  /** 라우터 path */
  path?: string;
  /** 라우터 component */
  element?: React.LazyExoticComponent<any>;
  /** layout component */
  layoutElement?: React.LazyExoticComponent<any>;
  /** page component */
  pageElement?: React.LazyExoticComponent<any>;
  /** children 라우트 */
  children?: Record<string, RouteNode>;
};

export type NodeData = {
  type: 'page' | 'layout';
  element: React.LazyExoticComponent<any>;
};
