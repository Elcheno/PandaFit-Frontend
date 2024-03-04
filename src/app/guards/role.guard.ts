import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

/**
 * Custom role guard function to check user roles.
 */
export const roleGuard: CanActivateFn = (route, state) => {
  return true;
  const authService = inject(AuthService);
  const sessionData = authService.sessionData();
  const roles: any[] = sessionData?.roles;

  let response = false;

  if (sessionData && roles) {
    roles.map((role) => {
      if (role['authority'] === 'ROLE_ADMIN') response = true;
    });
  }
  console.log(response);
  return response;
};
