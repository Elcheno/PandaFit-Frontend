import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, take } from 'rxjs';
import { ToastService } from '../modal/toast.service';

@Injectable({
  providedIn: 'root'
})
export class FormActiveService {

  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  constructor() { }

  public formActive (formActive: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/active', formActive)
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
}
