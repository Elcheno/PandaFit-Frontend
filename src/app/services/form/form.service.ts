import { Injectable, inject } from '@angular/core';
import { IFormData } from '../../model/interfaces/i-form-data';
import { Observable, map, take } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';
import { IPage } from '../../model/interfaces/i-page';
import { IPageable } from '../../model/interfaces/i-pageable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private readonly http = inject(HttpClient);

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

  public getAll (pageParams?: IPage): Observable<IPageable<IFormData>> {
    return this.http.get<IPageable<IFormData>>(`${env.api.url}${env.api.form}${env.api.formulary}/page`, { params: pageParams as any }) //cambiar URL
      .pipe(
        map((res: any) => {
          const response: IPageable<IFormData> = {
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

  public getById (id: string): Observable<IFormData> {
    return this.http.get<IFormData>(`${env.api.url}${env.api.form}${env.api.formulary}/${id}`)
      .pipe(
        map((res: any) => {
          const response: IFormData = { ...res };
          return response;
        }),
        take(1)
      );
  }

  public create (data: any): Observable<IFormData> {
    return this.http.post<IFormData>(`${env.api.url}${env.api.form}${env.api.formulary}`, data)
      .pipe(
        map((res: any) => {
          const response: IFormData = { ...res };
          return response;
        }),
        take(1)
      );
  }

  public delete (data: any): Observable<IFormData> {
    return this.http.delete<IFormData>(`${env.api.url}${env.api.form}${env.api.formulary}`, { body: data })
    .pipe(
      map((res: any) => {
        const response: IFormData = { ...res };
        return response;
      }),
      take(1)
    );
  }

  public update (data: any): Observable<IFormData> {
    return this.http.put<IFormData>(`${env.api.url}${env.api.form}${env.api.formulary}`, data)
      .pipe(
        map((res: any) => {
          const response: IFormData = { ...res };
          return response;
        }),
        take(1)
      );
  }
}
