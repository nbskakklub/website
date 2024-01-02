type Pagination = {
  page: number | undefined;
  current: boolean;
  excerpt: boolean;
};

export function generatePagination(
  current: number,
  pages: number
): Pagination[] {
  let pagination = [];

  for (let i = 1; i <= pages; i++) {
    // Include the first page, the last page, and the current page along with two pages before and after the current page
    if (i === 1 || i === pages || (i >= current - 2 && i <= current + 2)) {
      pagination.push({ page: i, current: i === current, excerpt: false });
    } else if (i === 2 || i === pages - 1) {
      // Add an excerpt before and after the middle pages
      pagination.push({ page: undefined, current: false, excerpt: true });
    }
  }

  return pagination;
}
