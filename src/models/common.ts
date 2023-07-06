export interface Pagination {
  limit: number;
  page: number;
  total: number;
}
export interface ListResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface SingleResponse<T> {
  data: T;
}

export interface ItemAttribute {
  isNew: boolean;
  isDeleted: boolean;
}
