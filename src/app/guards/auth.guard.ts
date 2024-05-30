import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const user = localStorage.getItem('userLogin');
  const tipo = localStorage.getItem('userTipo');

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};