import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { environment as env } from '../../environments/environment.development';

/**
 * Custom role guard function to check user roles.
 */
export const roleGuard: CanActivateFn = (route, state) => {
  if(env.dev === true) return true;
  
  const authService = inject(AuthService);
  const routerService = inject(Router);
  const role: string = authService.getRole();

  let response = false;

  if (role) {
    if (role === 'ROLE_ADMIN'){ 
      response = true;
    } else {
      routerService.navigateByUrl('/');
    }
    
  }
  
  return response;
};
