/**
 * 폴더 경로를 "/" 기준으로 쪼개어 세그먼트 배열을 반환하는 함수
 * @param filePath 폴더 경로
 * @returns 세그먼트 배열
 */
export function getPathSegments(filePath: string): string[] {
  const normalizedPath = filePath.replace(/\\/g, '/');

  let relativePath = normalizedPath.replace(/^\/src\/pages/, '');

  /** 그룹 폴더를 처리하여 경로 세그먼트에서 제거하지만 트리 구조에서는 유지 */
  const segments = relativePath
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      if (segment.startsWith('(') && segment.endsWith(')')) {
        return '';
      }
      return segment;
    })
    .filter((segment) => segment !== '');

  /** 메인 진입점 처리 (`/pages/page.tsx` || `/pages/layout.tsx`) */
  if (segments[0].startsWith('page.') || segments[0].startsWith('layout.')) {
    segments[0] = '/';
  }

  /** 파일 이름을 제거 */
  if (
    segments[segments.length - 1].startsWith('page.') ||
    segments[segments.length - 1].startsWith('layout.')
  ) {
    segments.pop();
  }

  return segments;
}
