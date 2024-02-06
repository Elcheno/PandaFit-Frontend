import { Injectable } from '@angular/core';
import { IFormData } from '../../model/interfaces/i-form-data';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private _mockData:IFormData[]=[
    {
      "id": "5799",
      "name": "Calculo de IMC",
      "description": "",
      "outputs": [
          1
      ],
      "inputs": [
          1,
          2
      ]
  }
  ]
  constructor() { }

  get mockData(): IFormData[] {
    return this._mockData;
  }
  set mockData(value: IFormData[]) {
    this._mockData = value;
  }

  addForm(form:IFormData){
    this._mockData.push(form)
  }
}
