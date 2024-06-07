import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('userToken');
  if (token) {
    return true;
  } else {
    sessionStorage.clear();
    router.navigate(['/']);
    return false;
  }
};
