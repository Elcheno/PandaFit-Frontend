import { Injectable, inject } from '@angular/core';
import { IFormData } from '../../model/interfaces/i-form-data';
import { Observable, catchError, map, of, take } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';
import { IPage } from '../../model/interfaces/i-page';
import { IPageable } from '../../model/interfaces/i-pageable';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private readonly authService = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly storeService = inject(StoreService);

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
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    const cacheData = this.storeService.formStore.getData();
    if (!(this.storeService.formStore.rehidrate() || this.storeService.formStore.reload()) && cacheData) return of(cacheData);
    
    return this.http.get<IPageable<IFormData>>(`${env.api.url}${env.api.form}${env.api.formulary}/page`, { params: pageParams as any, headers: { Authorization: token ?? "" } })
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
          this.storeService.formStore.setData(response);
          return response;
        }),
        take(1)
      );
  }

  public getAllFilteringByName (pageParams: IPage, name: string): Observable<IPageable<IFormData>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    const queryParams = {
      ...pageParams,
      name, // Add the name parameter for filtering
    };
    
    return this.http.get<IPageable<IFormData>>(`${env.api.url}${env.api.form}${env.api.formulary}/page/name`, { params: queryParams as any, headers: { Authorization: token ?? "" } })
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
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    const userId: string = sessionData.id;
    const newData: any = { ...data, userId: userId }
    return this.http.post<IFormData>(`${env.api.url}${env.api.form}${env.api.formulary}`, newData, { headers: { Authorization: token ?? "" } })
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
