import { IUser } from "../model/interfaces/i-user";
import { IPageable } from "../model/interfaces/i-pageable";
import { createStore } from "./store";
import { WritableSignal, signal } from "@angular/core";

export default function userInstitutionStore () {
  let store = createStore<IPageable<IUser>>();

  const institutionId: WritableSignal<string> = signal('');

  const setData = (value: IPageable<IUser>, id: string) => {
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