import { IUser } from "../model/interfaces/i-user";
import { IPageable } from "../model/interfaces/i-pageable";
import { createStore } from "./store";

export default function userStore () {
  return createStore<IPageable<IUser>>();
}