export interface IPageable<T> {
  page: number
  size: number
  totalElements: number
  totalPages: number
  content: T[]
}
