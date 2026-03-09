export type Pagination = PaginationParams &{
  total: number
  totalPages: number
}

export type PaginationParams = {
  page: number
  limit: number
}
