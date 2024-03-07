import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastService } from '../modal/toast.service';
import { Observable, catchError, map, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment as env } from '../../../environments/environment.development';

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

}
