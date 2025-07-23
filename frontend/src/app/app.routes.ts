import { Routes } from '@angular/router';
import { authenticatedGuardGuard } from './guards/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./routes/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'auth/login',
    pathMatch: 'full',
    loadComponent: () =>
      import('./routes/auth/pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'protegida',
    pathMatch: 'full',
    //canActivate: [authenticatedGuardGuard],
    loadComponent: () =>
      import('./routes/protegida/protegida.page').then((m) => m.ProtegidaPage),
  },
];
