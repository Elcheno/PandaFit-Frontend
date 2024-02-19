import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/modal/toast.service';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

export const notResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const authService = inject(AuthService);
  const routeService = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.status === 0) {
        errorMessage = `Error: ${error.message}, compruebe el servidor`;
        toastService.showToast('Error de conexión con el servidor', 'error');
        return throwError(() => errorMessage);

      } else if (error.status === 500) {
        errorMessage = `Error: ${error.message}`;
        toastService.showToast('Error al conectar con el servidor', 'error');
        return throwError(() => errorMessage);

      } else if (error.status === 403) {
        const isLoggerIn = authService.sessionData() ? true : false;
        if (!isLoggerIn) {
          routeService.navigate(['login']);
          errorMessage = 'Inicio de sesión requerido'
          toastService.showToast('Inicio de sesión requerido', 'error');
          return throwError(() => errorMessage);
        } else {
          authService.logOut(); 
          routeService.navigate(['login']);
          errorMessage = 'Su sesión ha expirado. Por favor, inicia sesión nuevamente.'
          toastService.showToast('Su sesión ha expirado', 'error');
          return throwError(() => errorMessage);
        }
      }

      return throwError(() => error);
    })
  );
};
