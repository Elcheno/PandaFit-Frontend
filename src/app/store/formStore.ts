import { IPageable } from "../model/interfaces/i-pageable";
import { createStore } from "./store";

export default function formStore () {
  return createStore<IPageable<any>>();
}