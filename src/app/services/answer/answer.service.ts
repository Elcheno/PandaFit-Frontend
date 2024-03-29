import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastService } from '../modal/toast.service';
import { Observable, catchError, map, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment as env } from '../../../environments/environment.development';
import { IPageable } from '../../model/interfaces/i-pageable';
import { IPage } from '../../model/interfaces/i-page';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly authService = inject(AuthService);

  constructor() { }

  public post (data: any): Observable<any> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.post<any>(`${env.api.url}${env.api.active}/response`, data, { headers: { Authorization: token ?? "" } })
      .pipe(
        catchError((error) => {
          console.error(error);
          this.toastService.showToast('Error al enviar la respuesta', 'error');
          return error;
        }),
        map((res: any) => {
          return res;
        }),
        take(1)
      );
  }

  public getByFormAct(pageParams?: IPage, formActiveId?: string): Observable<IPageable<any>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<any>(`${env.api.url}${env.api.active}/${env.api.response}/page/formAct/${formActiveId}`, { params: pageParams as any, headers: { Authorization: token ?? "" } })
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
}
