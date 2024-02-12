import { Injectable, inject } from '@angular/core';
import { IInputData } from '../../model/interfaces/i-input-data';
import { IInputType } from '../../model/interfaces/i-input-type';
import { HttpClient } from '@angular/common/http';
import { type IPageable } from '../../model/interfaces/i-pageable';
import { IPage } from '../../model/interfaces/i-page';
import { Observable, map, take } from 'rxjs';
import { environment } from '../../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class InputService {

  private _mockData:IInputData[]=[
    {
      id:'1',
      name:'Peso',
      description:'Inserte peso en kgs',
      type:IInputType.NUMBER,
      decimal:true,
      decimals:2,
      unit:'kgs'
    },
    {
      id:'2',
      name:'Altura',
      description:'Inserte altura en cms',
      type:IInputType.NUMBER,
      decimal:false,
      decimals:0,
      unit:'cms'
    },
    {
      id:'3',
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
    /*{
      id:'3',
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
    {
      id:'3',
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
    {
      id:'3',
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
    {
      id:'3',
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
    {
      id:'3',
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },
    {
      id:'3',
      name:'Fumador',
      description:'Indique si fuma',
      type:IInputType.BOOLEAN,
      decimal:false,
      decimals:0,
      unit:''
    },*/
    {
      id:'4',
      name:'Deporte',
      description:'Indique si practica deporte',
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

  /*addInput(input:IInputData){
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
  }*/

  // Hacer servicio completo

  private readonly http = inject(HttpClient);

  private async getAllMock (page?: number): Promise<IPageable<IInputData>> {
    return await new Promise((resolve, _reject) => {
      if (page !== undefined) {
        if (page === 0) {
          setTimeout(() => {
            const data: IPageable<IInputData> = {
              page: 0,
              size: 10,
              sort: ['name'],
              totalElements: 12,
              totalPages: 2,
              content: [
                {
                  id: '1',
                  name: 'Input 1',
                  description: 'Descripcion Input 1',
                  type: IInputType.NUMBER,
                  decimal: true,
                  decimals: 2,
                  unit: 'cm'
                },
                {
                  id: '2',
                  name: 'Input 2',
                  description: 'Descripcion Input 2',
                  type: IInputType.TEXT,
                  decimal: false,
                  unit: 'lll'
                },
                {
                  id: '3',
                  name: 'Input 3',
                  description: 'Descripcion Input 3',
                  type: IInputType.BOOLEAN,
                  decimal: false,
                  unit: 'boolean'
                },
                {
                  id: '4',
                  name: 'Input 4',
                  description: 'Descripcion Input 4',
                  type: IInputType.NUMBER,
                  decimal: true,
                  decimals: 4,
                  unit: 'm'
                },
                {
                  id: '5',
                  name: 'Input 5',
                  description: 'Descripcion Input 5',
                  type: IInputType.TEXT,
                  decimal: false,
                  unit: 'nnn'
                },
                {
                  id: '6',
                  name: 'Input 6',
                  description: 'Descripcion Input 6',
                  type: IInputType.BOOLEAN,
                  decimal: false,
                  unit: 'boolean'
                },
                {
                  id: '7',
                  name: 'Input 7',
                  description: 'Descripcion Input 7',
                  type: IInputType.NUMBER,
                  decimal: true,
                  decimals: 3,
                  unit: 'kg'
                },
                {
                  id: '8',
                  name: 'Input 8',
                  description: 'Descripcion Input 8',
                  type: IInputType.TEXT,
                  decimal: false,
                  unit: 'ssss'
                },
                {
                  id: '9',
                  name: 'Input 9',
                  description: 'Descripcion Input 9',
                  type: IInputType.BOOLEAN,
                  decimal: false,
                  unit: 'boolean'
                },
                {
                  id: '10',
                  name: 'Input 10',
                  description: 'Descripcion Input 10',
                  type: IInputType.NUMBER,
                  decimal: true,
                  decimals: 2,
                  unit: 'g'
                },
              ]
            };
            resolve(data);
          }, 1000);
        } else {
          setTimeout(() => {
            const data: IPageable<IInputData> = {
              page: 1,
              size: 10,
              sort: ['name'],
              totalElements: 12,
              totalPages: 2,
              content: [
                {
                  id: '11',
                  name: 'Input 11',
                  description: 'Descripcion Input 11',
                  type: IInputType.TEXT,
                  decimal: false,
                  unit: 'vvvv'
                },
                {
                  id: '12',
                  name: 'Input 12',
                  description: 'Descripcion Input 12',
                  type: IInputType.BOOLEAN,
                  decimal: false,
                  unit: 'boolean'
                }
              ]
            };
            resolve(data);
          }, 1000);
        }
      } else {
        setTimeout(() => {
          const data: IPageable<IInputData> = {
            page: 0,
            size: 10,
            sort: ['name'],
            totalElements: 3,
            totalPages: 1,
            content: [
              {
                id: '1',
                name: 'Input 1',
                description: 'Descripcion Input 1',
                type: IInputType.NUMBER,
                decimal: true,
                decimals: 2,
                unit: 'cm'
              },
              {
                id: '2',
                name: 'Input 2',
                description: 'Descripcion Input 2',
                type: IInputType.TEXT,
                decimal: false,
                unit: 'lll'
              },
              {
                id: '3',
                name: 'Input 3',
                description: 'Descripcion Input 3',
                type: IInputType.BOOLEAN,
                decimal: false,
                unit: 'boolean'
              }
            ]
          };
          resolve(data);
        }, 1000);
      }
    });
  }

  public getAll (pageParams?: IPage): Observable<IPageable<IInputData>>{
    return this.http.get<IPageable<IInputData>>(`${environment.api.url}${environment.api.input}/page`, { params: pageParams as any})
      .pipe(
        map((res: any) => {
          const response: IPageable<IInputData> = {
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

  public getById (id: string): Observable<IInputData> {
    return this.http.get<IInputData>(`${environment.api.url}${environment.api.input}/${id}`)
      .pipe(
        map((res: any) => {
          const response: IInputData = { ...res };
          return response;
        }),
        take(1)
      );
  }

  public create (data: any): Observable<IInputData> {
    return this.http.post<IInputData>(`${environment.api.url}${environment.api.input}`, data)
      .pipe(
        map((res: any) => {
          const response: IInputData = { ...res };
          return response;
        }),
        take(1)
      );
  }

  public delete (data: any): Observable<IInputData>{ 
  return this.http.delete<IInputData>(`${environment.api.url}${environment.api.input}`, { body: data })
    .pipe(
      map((res: any) => {
        const response: IInputData = { ...res };
        return response;
      }),
      take(1)
    );
  }

  public update (data: any): Observable<IInputData>{
    return this.http.put<IInputData>(`${environment.api.url}${environment.api.input}`, data)
      .pipe(
        map((res: any) => {
          const response: IInputData = { ...res };
          return response;
        }),
        take(1)
      );
  }

}
