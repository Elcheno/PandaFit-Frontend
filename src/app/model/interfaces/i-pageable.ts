import { type IPage } from './i-page';

export interface IPageable<T> extends IPage {
  totalElements: number
  totalPages: number
  content: T[]
}
