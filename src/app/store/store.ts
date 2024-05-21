import { signal, WritableSignal } from "@angular/core";

const createStore = <T>() => {

  const data: WritableSignal<T | null> = signal(null);
  const rehidrate: WritableSignal<boolean> = signal(true);
  const reload: WritableSignal<boolean> = signal(false);

  const setData = (value: T) => {
    data.set(value);
    rehidrate.set(false);
    reload.set(false);
  }

  const getData = () => {
    return data();
  }

  const clearData = () => {
    data.set(null);
  }

  const revalidate = () => {
    rehidrate.set(true);
  }

  const reloadData = () => {
    reload.set(true);
  }

  return {
    data,
    rehidrate,
    reload,
    setData,
    getData,
    clearData,
    revalidate,
    reloadData
  };
};

export {
  createStore
}