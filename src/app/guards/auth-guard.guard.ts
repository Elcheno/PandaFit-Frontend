import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
  const authService = inject(AuthService);
  const routeService = inject(Router);

  const isLoggger = authService.sessionData() ? true : false;

  if (isLoggger) {
    return true;

  } else {
    routeService.navigateByUrl('/login');
    return false;

  }
};
