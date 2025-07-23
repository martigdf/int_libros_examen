import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticatedGuardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  router.navigate(['/auth/login']);
  const hayUsuarioAutenticado = false;

  //Implementar la lógica

  return hayUsuarioAutenticado;
};
