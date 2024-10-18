import { LoaderFunction } from 'react-router-dom';

export type RouteNode = {
  /** 라우터 path */
  path?: string;
  /** 라우터 component */
  element?: React.LazyExoticComponent<React.ComponentType<any>>;
  /** layout component */
  layoutElement?: React.LazyExoticComponent<React.ComponentType<any>>;
  /** page component */
  pageElement?: React.LazyExoticComponent<React.ComponentType<any>>;
  /** error component */
  errorElement?: React.LazyExoticComponent<React.ComponentType<any>>;
  /** loading component */
  loadingElement?: React.LazyExoticComponent<React.ComponentType<any>>;
  /** loader function */
  loaderFn?: LoaderFunction;
  /** children 라우트 */
  children?: Record<string, RouteNode>;
};

export type NodeData = {
  type: 'page' | 'layout' | 'error' | 'loading' | 'loader';
  element: React.LazyExoticComponent<React.ComponentType<any>> | LoaderFunction;
};
