import { CanActivateFn } from '@angular/router';
import { environment as env } from '../../environments/environment.development';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  if(env.dev === true) return true;

  const authService = inject(AuthService);
  const routeService = inject(Router);

  const sessionData = authService.sessionData();

  const isLogger = sessionData?.token ? true : false;

  if (!isLogger) return true;

  if (isLogger) {
    routeService.navigateByUrl('/institutions');
    return false;
  }

  return true;
};
