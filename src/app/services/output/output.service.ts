import { Injectable, inject } from '@angular/core';
import { IOutputData } from '../../model/interfaces/i-output-data';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../../model/interfaces/i-page';
import { Observable, lastValueFrom, map, take } from 'rxjs';
import { IPageable } from '../../model/interfaces/i-pageable';
import { environment as env } from '../../../environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OutputService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private allOutputs: IOutputData[] = [];

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

  async getOutputsWithInputsId (ids: string[]): Promise<IOutputData[]> {
    let result:IOutputData[] = [];
    if(this.allOutputs.length == 0) {
      this.allOutputs = (await lastValueFrom(this.getAll({ page: 0, size: 1000, sort: ['name'] }))).content;
    }
    this.allOutputs.forEach(output => {      
      if(output.inputsId && output.inputsId.length > 0) {
        
        const filteredArray = ids.filter(value => output.inputsId?.includes(value));
        // 
        
        if(filteredArray && filteredArray.length==output.inputsId.length) {
          result.push(output)
        }
      }
    })
    // 
    return Promise.resolve(result);
  }

  public getAll (pageParams?: IPage): Observable<IPageable<IOutputData>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<IPageable<IOutputData>>(`${env.api.url}${env.api.form}${env.api.output}/page`, { params: pageParams as any, headers: { Authorization: token ?? "" } })
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

  public getAllFilteringByName (pageParams: IPage, name: string): Observable<IPageable<IOutputData>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    const queryParams = {
      ...pageParams,
      name, // Add the name parameter for filtering
    };
    
    return this.http.get<IPageable<IOutputData>>(`http://localhost:8080/form/page/output/name`, { params: queryParams as any, headers: { Authorization: token ?? "" } })
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
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<IOutputData>(`${env.api.url}${env.api.form}${env.api.output}/${id}`, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IOutputData = { ...res };
          return response;
        }),
        take(1)
      );
  }


  public create (data: IOutputData): Observable<IOutputData> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    const userId: string = sessionData.id;

    const newData = { ...data, userOwnerId: userId }
    // 
    return this.http.post<IOutputData>(`${env.api.url}${env.api.form}${env.api.output}`, newData, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IOutputData = { ...res };
          return response;
        }),
        take(1)
      );
  }

  public delete (data: IOutputData): Observable<IOutputData> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.delete<IOutputData>(`${env.api.url}${env.api.form}${env.api.output}`, { body: data, headers: { Authorization: token ?? "" } })
    .pipe(
      map((res: any) => {
        const response: IOutputData = { ...res };
        return response;
      }),
      take(1)
    );
  }

  public update (data: IOutputData): Observable<IOutputData> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.put<IOutputData>(`${env.api.url}${env.api.form}${env.api.output}`, data, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IOutputData = { ...res };
          return response;
        }),
        take(1)
      );
  }
  
}
