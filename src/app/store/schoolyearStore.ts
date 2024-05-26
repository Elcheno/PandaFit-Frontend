import { ISchoolYear } from "../model/interfaces/i-school-year";
import { IPageable } from "../model/interfaces/i-pageable";
import { createStore } from "./store";
import { WritableSignal, signal } from "@angular/core";

export default function schoolYearStore () {
  let store = createStore<IPageable<ISchoolYear>>();

  const institutionId: WritableSignal<string> = signal('');

  const setData = (value: IPageable<ISchoolYear>, id: string) => {
    store.data.set(value);
    institutionId.set(id);
    store.rehidrate.set(false);
    store.reload.set(false);
  }

  const getData = () => {
    return {
      data: store.data(),
      institutionId: institutionId()
    }
  }

  return {
    ...store,
    setData,
    getData,
    institutionId
  };
}