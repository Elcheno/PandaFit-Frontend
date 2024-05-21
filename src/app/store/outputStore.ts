import { IOutputData } from "../model/interfaces/i-output-data";
import { IPageable } from "../model/interfaces/i-pageable";
import { createStore } from "./store";

export default function outputStore () {
  return createStore<IPageable<IOutputData>>();
}