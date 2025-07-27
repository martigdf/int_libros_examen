import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MainStoreService } from '../services/main-store.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {

  const mainStore = inject(MainStoreService);
  const usuario = mainStore.usuario();

  const token = mainStore.token();
  if (!usuario || !token) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }

  return true;
};
