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


  private _mockData: IOutputData[] = [
    {
      id: "1",
      name:'IMC',
      description:'Índice de masa muscular',
      inputsId: ['1','2'],
      formula:"#1{Peso}/Math.pow(#2{Altura}/100,2)",
      umbralList: [],
      unit:''
    }
  ]
  get mockData(): IOutputData[] {
    return this._mockData;
  }
  set mockData (value: IOutputData[]) {
    this._mockData = value;
  }

  addOutput (output: IOutputData) {
    if (this.searchOutput(output.id)) {
      return
    }
    this._mockData.push(output)
  }

  removeOuput (id: string) {
    this._mockData = this._mockData.filter(input => input.id !== id);
  }

  searchOutput (id: string | undefined): IOutputData | undefined {
    return this._mockData.find(input=>input.id === id)
  }

  getOutputsWithInputsId (ids: string[]) {
    let result:IOutputData[] = [];
    this._mockData.forEach(output => {
      if(output.inputsId && output.inputsId.length > 0) {
        const filteredArray = ids.filter(value => output.inputsId?.includes(value));
        if(filteredArray && filteredArray.length==output.inputsId.length) {
          result.push(output)
        }
      }
    })
    return result;
  }

  public getAll (pageParams?: IPage): Observable<IPageable<IOutputData>> {
    return this.http.get<IPageable<IOutputData>>(`${env.api.url}${env.api.form}${env.api.output}/page`, { params: pageParams as any })
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
    return this.http.get<IOutputData>(`${env.api.url}${env.api.form}${env.api.output}/${id}`)
      .pipe(
        map((res: any) => {
          const response: IOutputData = { ...res };
          return response;
        }),
        take(1)
      );
  }


  public create (data: IOutputData): Observable<IOutputData> {
    const userId: string = 'ec2384fe-1613-4f1c-8f15-3278b6c80d20';
    const newData = { ...data, userOwnerId: userId }
    console.log(newData);
    return this.http.post<IOutputData>(`${env.api.url}${env.api.form}${env.api.output}`, newData)
      .pipe(
        map((res: any) => {
          const response: IOutputData = { ...res };
          return response;
        }),
        take(1)
      );
  }

  public delete (data: IOutputData): Observable<IOutputData> {
    return this.http.delete<IOutputData>(`${env.api.url}${env.api.form}${env.api.output}`, { body: data })
    .pipe(
      map((res: any) => {
        const response: IOutputData = { ...res };
        return response;
      }),
      take(1)
    );
  }

  public update (data: IOutputData): Observable<IOutputData> {
    return this.http.put<IOutputData>(`${env.api.url}${env.api.form}${env.api.output}`, data)
      .pipe(
        map((res: any) => {
          const response: IOutputData = { ...res };
          return response;
        }),
        take(1)
      );
  }
  
}
