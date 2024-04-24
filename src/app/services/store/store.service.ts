import { Injectable } from "@angular/core";
import institutionStore from "../../store/institutionStore";
import userStore from "../../store/userStore";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public institutionStore: any;
  public userStore: any;

  constructor() {
    this.institutionStore = institutionStore();
    this.userStore = userStore();
  }

}
