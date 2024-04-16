import { Injectable } from "@angular/core";
import institutionStore from "../../store/institutionStore";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public institutionStore: any;

  constructor() {
    this.institutionStore = institutionStore();
  }

}