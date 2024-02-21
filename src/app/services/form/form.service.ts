import { Injectable, inject } from '@angular/core';
import { IFormData } from '../../model/interfaces/i-form-data';
import { Observable, catchError, map, take } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';
import { IPage } from '../../model/interfaces/i-page';
import { IPageable } from '../../model/interfaces/i-pageable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private readonly authService = inject(AuthService);
  private readonly http = inject(HttpClient);

  private _mockData:IFormData[]=[
    {
      "id": "5799",
      "name": "Calculo de IMC",
      "description": ""
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
          console.log(res);
          const response: IFormData = { ...res };
          return response;
        }),
        take(1)
      );
  }

  public create (data: any): Observable<IFormData> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    const userId: string = '3630fe4b-d2c5-4336-aae3-c9a2352c24bf';
    const newData: any = { ...data, userId: userId }
    return this.http.post<IFormData>(`http://localhost:8080/form/formulary`, newData, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IFormData = { ...res };
          return response;
        }),
        take(1)
      );
  }

  public delete (data: any): Observable<IFormData> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.delete<IFormData>(`${env.api.url}${env.api.form}${env.api.formulary}`, { body: data, headers: { Authorization: token ?? "" } })
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
