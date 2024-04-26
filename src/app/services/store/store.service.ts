import { Injectable } from "@angular/core";
import institutionStore from "../../store/institutionStore";
import userStore from "../../store/userStore";
import inputStore from "../../store/inputStore";
import outputStore from "../../store/outputStore";
import formStore from "../../store/formStore";
import schoolYearStore from "../../store/schoolyearStore";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public institutionStore: any;
  public userStore: any;
  public inputStore: any;
  public outputStore: any;
  public formStore: any;
  public schoolYearStore: any;

  constructor() {
    this.institutionStore = institutionStore();
    this.userStore = userStore();
    this.inputStore = inputStore();
    this.outputStore = outputStore();
    this.formStore = formStore();
    this.schoolYearStore = schoolYearStore();
  }

}
