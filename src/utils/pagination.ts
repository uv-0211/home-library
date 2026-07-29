export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function getSkipTake(page: number, limit: number) {
  return { skip: (page - 1) * limit, take: limit };
}
