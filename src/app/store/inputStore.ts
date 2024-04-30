import { IInputData } from "../model/interfaces/i-input-data";
import { IPageable } from "../model/interfaces/i-pageable";
import { createStore } from "./store";

export default function inputStore () {
  return createStore<IPageable<IInputData>>();
}