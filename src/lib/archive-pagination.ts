export const PAGE_SIZE = 6;
export const ARCHIVE_ROOT = "/blog";

export function archivePath(page = 1) {
  return `${ARCHIVE_ROOT}${page === 1 ? "" : `/page/${page}`}`;
}

export function archivePageCount(count: number) {
  return Math.max(1, Math.ceil(count / PAGE_SIZE));
}

export function archivePages(count: number) {
  return Array.from({ length: archivePageCount(count) - 1 }, (_, index) => index + 2);
}

export function archivePageFromPath(path: string, count: number) {
  const normalized = path.replace(/\/$/, "");
  if (normalized === ARCHIVE_ROOT) return 1;
  return archivePages(count).find((page) => archivePath(page).replace(/\/$/, "") === normalized);
}
