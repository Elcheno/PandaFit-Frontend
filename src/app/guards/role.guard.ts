import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { environment as env } from '../../environments/environment.development';

/**
 * Custom role guard function to check user roles.
 */
export const roleGuard: CanActivateFn = (route, state) => {
  if(env.dev === true) return true;
  
  const authService = inject(AuthService);
  const sessionData = authService.sessionData();
  const roles: any[] = sessionData?.roles;

  let response = false;

  if (sessionData && roles) {
    roles.map((role) => {
      if (role['authority'] === 'ROLE_ADMIN') response = true;
    });
  }
  
  return response;
};
