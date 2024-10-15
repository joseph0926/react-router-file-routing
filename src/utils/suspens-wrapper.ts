import React from 'react';

/** Suspense로 감싸진 컴포넌트를 생성하는 헬퍼 함수 */
export function wrapWithSuspense(
  Component: React.ComponentType,
  loadingComponent?: React.ReactNode,
): React.ReactElement {
  return React.createElement(
    React.Suspense,
    { fallback: loadingComponent },
    React.createElement(Component),
  );
}
