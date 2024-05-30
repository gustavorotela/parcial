import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const user = localStorage.getItem('userLogin');
  const tipo = localStorage.getItem('userTipo');

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const expectedRole = route.data['expectedRole'];

  if (expectedRole && tipo !== expectedRole) {
    authService.setErrorMessage('No tiene los permisos necesarios para acceder a esta página.');
    return false;
  }

  return true;
};