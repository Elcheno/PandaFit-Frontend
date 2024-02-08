import { Injectable } from '@angular/core';
import { IInputData } from '../../model/interfaces/i-input-data';
import { IInputType } from '../../model/interfaces/i-input-type';


@Injectable({
  providedIn: 'root'
})
export class InputService {

  private _mockData:IInputData[]=[
    {
      id:1,
      name:'Peso',
      description:'Inserte peso en kgs',
      type:IInputType.NUMBER,
      decimal:true,
      decimals:2,
      unit:'kgs'
    },
    {
      id:2,
      name:'Altura',
      description:'Inserte altura en cms',
      type:IInputType.NUMBER,
      decimal:false,
      decimals:0,
      unit:'cms'
    },
    {
      id:3,
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
    {
      id:3,
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
    {
      id:3,
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
    {
      id:3,
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
    {
      id:3,
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
    {
      id:3,
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
    {
      id:3,
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
    {
      id:3,
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
  ]
  constructor() { }

  get mockData(): IInputData[] {
    return this._mockData;
  }
  set mockData(value: IInputData[]) {
    this._mockData = value;
  }

  addInput(input:IInputData){
    if(this.searchInput(input.id)){
      return
    }
    this._mockData.push(input)
  }
  removeInput(id:number){
    this._mockData=this._mockData.filter(input=>input.id!==id)
  }
  searchInput(id:number|undefined):IInputData|undefined{
    return this._mockData.find(input=>input.id===id)
  }
}
