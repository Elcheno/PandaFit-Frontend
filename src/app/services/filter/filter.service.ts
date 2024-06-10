import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, take, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../modal/toast.service';
import { StoreService } from '../store/store.service';
import { environment as env } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly storeService = inject(StoreService);

  constructor() { }

  // metodo que consumen el endpoint de la api para filtrar los datos
  public filter (filter: any[]): Observable<any> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;
  
    return this.http.post<any>(`${env.api.url}${env.api.active}/${env.api.response}/${env.api.query}`, filter, { headers: { Authorization: token ?? "" }})
      .pipe(
        catchError((error) => {
          console.error(error);
          this.toastService.showToast('Error al cargar los registros', 'error');
          return error;
        }),
        map((res: any) => {
          return res;
        }),
        take(1)
      );
  }
}
