import { Injectable } from '@angular/core';
import { OutputData } from '../../model/interfaces/i-output-data';

@Injectable({
  providedIn: 'root'
})
export class OutputService {
  private _mockData:OutputData[]=[
    {
      id:1,
      name:'IMC',
      description:'Índice de masa muscular',
      inputsIds:[1,2],
      calculations:"#1{Peso}/Math.pow(#2{Altura}/100,2)",
      umbrals: [],
      unit:''
    }
  ]
  get mockData(): OutputData[] {
    return this._mockData;
  }
  set mockData(value: OutputData[]) {
    this._mockData = value;
  }

  addOutput(output: OutputData){
    if(this.searchOutput(output.id)){
      return
    }
    this._mockData.push(output)
  }

  removeOuput(id:number){
    this._mockData=this._mockData.filter(input=>input.id!==id)
  }

  searchOutput(id:number|undefined):OutputData|undefined{
    return this._mockData.find(input=>input.id===id)
  }

  getOutputsWithInputsId(ids:number[]){
    let result:OutputData[]=[];
    this._mockData.forEach(output=>{
      if(output.inputsIds && output.inputsIds.length>0){
        const filteredArray = ids.filter(value => output.inputsIds?.includes(value));
        if(filteredArray && filteredArray.length==output.inputsIds.length){
          result.push(output)
        }
      }
    })
    return result;
  }
}
