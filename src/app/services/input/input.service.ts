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

  private _mockData: IInputData[] = [
    {
      id: '1',
      name: 'Peso',
      description: 'Inserte peso en kgs',
      type: IInputType.NUMBER,
      decimal: true,
      decimals: 2,
      unit: 'kgs'
    },
    {
      id: '2',
      name: 'Altura',
      description: 'Inserte altura en cms',
      type: IInputType.NUMBER,
      decimal: false,
      decimals: 0,
      unit: 'cms'
    },
    {
      id: '3',
      name: 'Fumador',
      description: 'Indique si fuma',
      type: IInputType.BOOLEAN,
      decimal: false,
      decimals: 0,
      unit: ''
    },
    {
      id: '4',
      name: 'Deporte',
      description: 'Indique si practica deporte',
      type: IInputType.BOOLEAN,
      decimal: false,
      decimals: 0,
      unit: ''
    },
  ]
  constructor() { }

  get mockData(): IInputData[] {
    return this._mockData;
  }
  set mockData(value: IInputData[]) {
    this._mockData = value;
  }

  // addInput(input:IInputData){
  //   if(this.searchInput(input.id)){
  //     return
  //   }
  //   this._mockData.push(input)
  // }
  // removeInput(id:number){
  //   this._mockData=this._mockData.filter(input=>input.id!==id)
  // }
  searchInput(id: number | undefined): IInputData | undefined {
    return this._mockData.find(input => input.id === id)
  }

  // Hacer servicio completo

  private readonly http = inject(HttpClient);

  public getAll(pageParams?: IPage): Observable<IPageable<IInputData>> {
    return this.http.get<IPageable<IInputData>>(`${environment.api.url}${environment.api.form}${environment.api.input}/page`, { params: pageParams as any })
      .pipe(
        map((res: any) => {
          const response: IPageable<IInputData> = {
            page: res['number'],
            size: res['size'],
            sort: pageParams?.sort ?? ['name'],
            totalElements: res['totalElements'],
            totalPages: res['totalPages'],
            content: res['content'].map((input: IInputData) => ({ ...input , type: IInputType[input.type].toString()}))
          };
          return response;
        }),
        take(1)
      );
  }

  public getById (id: string): Observable<IInputData> {
    return this.http.get<IInputData>(`${environment.api.url}${environment.api.form}${environment.api.input}/${id}`)
      .pipe(
        map((res: any) => {
          const response: IInputData = { ...res , type: IInputType[res.type].toString()};
          return response;
        }),
        take(1)
      );
  }

  public create(input: IInputData): Observable<IInputData> {
    const data: any = {
      name: input.name,
      description: input.description,
      type: IInputType[input.type],
      decimal: input.decimal,
      decimals: input.decimals,
      unit: input.unit,
      userOwnerId: input.userOwnerId
    };

    return this.http.post<IInputData>(`${environment.api.url}${environment.api.form}${environment.api.input}`, data)
      .pipe(
        map((res: any) => {
          const response: IInputData = { ...res , type: IInputType[res.type].toString()};
          return response;
        }),
        take(1)
      );
  };

  public delete (data: any): Observable < IInputData > {
  return this.http.delete<IInputData>(`${environment.api.url}${environment.api.form}${environment.api.input}`, { body: data })
    .pipe(
      map((res: any) => {
        const response: IInputData = { ...res , type: IInputType[res.type].toString()};
        return response;
      }),
      take(1)
    );
}

  public update(data: any): Observable < IInputData > {
  return this.http.put<IInputData>(`${environment.api.url}${environment.api.form}${environment.api.input}`, data)
    .pipe(
      map((res: any) => {
        const response: IInputData = { ...res , type: IInputType[res.type].toString()};
        return response;
      }),
      take(1)
    );
}

}
