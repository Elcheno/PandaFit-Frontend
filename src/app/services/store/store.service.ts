import { Injectable } from "@angular/core";
import institutionStore from "../../store/institutionStore";
import userStore from "../../store/userStore";
import inputStore from "../../store/inputStore";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public institutionStore: any;
  public userStore: any;
  public inputStore: any;

  constructor() {
    this.institutionStore = institutionStore();
    this.userStore = userStore();
    this.inputStore = inputStore();
  }

}
