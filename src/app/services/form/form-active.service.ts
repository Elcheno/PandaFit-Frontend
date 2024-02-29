import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, take } from 'rxjs';
import { ToastService } from '../modal/toast.service';
import { IPageable } from '../../model/interfaces/i-pageable';
import { IPage } from '../../model/interfaces/i-page';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FormActiveService {

  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly authService = inject(AuthService);

  constructor() { }

  public formActive (formActive: any): Observable<any> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.post<any>('http://localhost:8080/active', formActive, { headers: { Authorization: token ?? "" } })
      .pipe(
        catchError((error) => {
          if (!error) return error;
          console.error(error);
          this.toastService.showToast('Error al activar formulario', 'error');
          return error;
        }),
        map((res: any) => {
          return res;
        }),
        take(1)
      );
  }

  public getById (id: string): Observable<any> {
    return this.http.get<any>('http://localhost:8080/active/' + id)
      .pipe(
        catchError((error) => {
          this.toastService.showToast('Error al cargar los registros', 'error');
          throw error;
        }),
        map((res: any) => {
          return res;
        }),
        take(1)
      );
  }

  public getAllBySchoolYear (id: any, pageParams?: IPage): Observable<IPageable<any>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<any>(`http://localhost:8080/active/page/schoolyear/${id}`, { params: pageParams as any, headers: { Authorization: token ?? "" } })
      .pipe(
        catchError((error) => {
          console.error(error);
          this.toastService.showToast('Error al cargar los registros', 'error');
          return error;
        }),
        map((res: any) => {
          const response: IPageable<any> = {
            page: res['number'],
            size: res['size'],
            sort: pageParams?.sort ?? ['email'],
            totalElements: res['totalElements'],
            totalPages: res['totalPages'],
            content: res['content']
          };
          return response;
        }),
        take(1)
      );
  }

  public getAllBySchoolYearAfter (id: any, pageParams?: IPage): Observable<IPageable<any>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<any>(`http://localhost:8080/active/page/schoolyear/after/${id}`, { params: pageParams as any, headers: { Authorization: token ?? "" } })
      .pipe(
        catchError((error) => {
          console.error(error);
          this.toastService.showToast('Error al cargar los registros', 'error');
          return error;
        }),
        map((res: any) => {
          const response: IPageable<any> = {
            page: res['number'],
            size: res['size'],
            sort: pageParams?.sort ?? ['email'],
            totalElements: res['totalElements'],
            totalPages: res['totalPages'],
            content: res['content']
          };
          return response;
        }),
        take(1)
      );
  }

  public getAllBySchoolYearBefore (id: any, pageParams?: IPage): Observable<IPageable<any>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<any>(`http://localhost:8080/active/page/schoolyear/before/${id}`, { params: pageParams as any, headers: { Authorization: token ?? "" } })
      .pipe(
        catchError((error) => {
          console.error(error);
          this.toastService.showToast('Error al cargar los registros', 'error');
          return error;
        }),
        map((res: any) => {
          const response: IPageable<any> = {
            page: res['number'],
            size: res['size'],
            sort: pageParams?.sort ?? ['email'],
            totalElements: res['totalElements'],
            totalPages: res['totalPages'],
            content: res['content']
          };
          return response;
        }),
        take(1)
      );
  }

  public close(data: any): Observable<any> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;
  
    return this.http.put<any>('http://localhost:8080/active/close', data, { headers: { Authorization: token ?? "" } })
      .pipe(
        catchError((error) => {
          console.error(error);
          this.toastService.showToast('Error al cerrar formulario', 'error');
          return error;
        }),
        map((res: any) => {
          return res;
        }),
        take(1)
      );
  }
  
}
