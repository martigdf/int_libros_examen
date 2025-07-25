import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MainStoreService } from '../services/main-store.service';

export const authenticatedGuardGuard: CanActivateFn = (route, state) => {

  const mainStore = inject(MainStoreService);
  const usuario = mainStore.usuario

  if (!usuario) {
    const router = inject(Router);
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
