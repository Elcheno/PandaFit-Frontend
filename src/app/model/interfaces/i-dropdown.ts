/* eslint-disable @typescript-eslint/array-type */
export interface IDropdownData <T> {
  button: IDropdownButton
  header?: string
  rows: IDropdownRow<T>[]
}

export interface IDropdownButton {
  title?: string
  icon?: any
}

export interface IDropdownRow <T> {
  title: string
  fnc?: (data?: T) => void | Promise<void>
  icon?: any
}
