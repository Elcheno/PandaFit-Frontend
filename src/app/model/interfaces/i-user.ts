import { type ITypeRole } from '../type/i-type-role';

export interface IUser {
  id: string
  email: string
  password: string
  role: ITypeRole[]
}
