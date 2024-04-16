import { IInstitution } from "../model/interfaces/i-institution";
import { IPageable } from "../model/interfaces/i-pageable";
import { createStore } from "./store";

export default function institutionStore () {
  return createStore<IPageable<IInstitution>>();
}