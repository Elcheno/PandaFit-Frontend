import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { environment as env } from '../../environments/environment.development';

/**
 * Custom authentication guard function to protect routes.
 */
export const authGuard: CanActivateFn = (route, state) => {
  if(env.dev === true) return true;

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
