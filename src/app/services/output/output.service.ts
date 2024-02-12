import { Injectable, inject } from '@angular/core';
import { IOutputData } from '../../model/interfaces/i-output-data';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../../model/interfaces/i-page';
import { Observable, map, take } from 'rxjs';
import { IPageable } from '../../model/interfaces/i-pageable';
import { environment as env } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OutputService {
  private readonly http = inject(HttpClient);


  private _mockData: IOutputData[]=[
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
  get mockData(): IOutputData[] {
    return this._mockData;
  }
  set mockData(value: IOutputData[]) {
    this._mockData = value;
  }

  addOutput(output: IOutputData){
    if(this.searchOutput(output.id)){
      return
    }
    this._mockData.push(output)
  }

  removeOuput(id:number){
    this._mockData=this._mockData.filter(input=>input.id!==id)
  }

  searchOutput(id:number|undefined):IOutputData|undefined{
    return this._mockData.find(input=>input.id===id)
  }

  getOutputsWithInputsId(ids:number[]){
    let result:IOutputData[]=[];
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

  public getAll (pageParams?: IPage): Observable<IPageable<IOutputData>> {
    return this.http.get<IPageable<IOutputData>>(`${env.api.url}${env.api.institution}/page`, { params: pageParams as any })
      .pipe(
        map((res: any) => {
          const response: IPageable<IOutputData> = {
            page: res['number'],
            size: res['size'],
            sort: pageParams?.sort ?? ['name'],
            totalElements: res['totalElements'],
            totalPages: res['totalPages'],
            content: res['content']
          };
          return response;
        }),
        take(1)
      );
  }

  public getById (id: string): Observable<IOutputData> {
    return this.http.get<IOutputData>(`${env.api.url}${env.api.institution}/${id}`)
      .pipe(
        map((res: any) => {
          const response: IOutputData = { ...res };
          return response;
        }),
        take(1)
      );
  }


  public create (data: any): Observable<IOutputData> {
    return this.http.post<IOutputData>(`${env.api.url}${env.api.institution}`, data)
      .pipe(
        map((res: any) => {
          const response: IOutputData = { ...res };
          return response;
        }),
        take(1)
      );
  }

  public delete (data: any): Observable<IOutputData> {
    return this.http.delete<IOutputData>(`${env.api.url}${env.api.institution}`, { body: data })
    .pipe(
      map((res: any) => {
        const response: IOutputData = { ...res };
        return response;
      }),
      take(1)
    );
  }

  public update (data: any): Observable<IOutputData> {
    return this.http.put<IOutputData>(`${env.api.url}${env.api.institution}`, data)
      .pipe(
        map((res: any) => {
          const response: IOutputData = { ...res };
          return response;
        }),
        take(1)
      );
  }
  
}
