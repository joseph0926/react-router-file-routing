/**
 * 파일/폴더 경로를 읽고 path로 변환하는 함수입니다.
 * @param filePath 파일/폴더 경로
 * @returns `path`: string
 */
export function formatPath(filePath: string): string {
  let path = filePath
    .replace(/^\/src\/pages/, '') // 폴더 경로에서 `path`에 포함되지 않을 부분 제거
    .replace(/\/page\.(jsx|tsx)$/, '') // 폴더 경로에서 page.tsx or page.jsx 제거
    .replace(/\[([^\]]+)\]/g, ':$1'); // [id] -> :id 로 변환

  if (path === '') {
    path = '/';
  }

  return path;
}
