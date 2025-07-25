import { Routes } from '@angular/router';
import { authenticatedGuardGuard } from './guards/authenticated.guard';
import { LoginPage } from './routes/auth/pages/login/login.page';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./routes/auth/pages/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./routes/auth/pages/register/register.page').then((m) => m.RegisterPage),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      }
    ]
  },
  {
    path: 'home',
    canActivate: [authenticatedGuardGuard],
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'books/:id',
    loadComponent: () =>
      import('./pages/book/book.page').then((m) => m.BookPage),
  },
  {
    path: 'menu-loans',
    loadComponent: () =>
      import('./pages/menu-loans/menu-loans.page').then((m) => m.MenuLoansPage),
  },
  {
    path: 'menu-loans/loans-rece/:id',
    loadComponent: () =>
      import('./pages/loans-rece/loans-rece.page').then((m) => m.LoansRecePage),
  },
  {
    path: 'menu-loans/loans-reque/:id',
    loadComponent: () =>
      import('./pages/loans-reque/loans-reque.page').then((m) => m.LoansRequePage),
  },
  {
    path: 'user-profile',
    loadComponent: () =>
      import('./pages/user-profile/user-profile.page').then((m) => m.UserProfilePage),
  },
  {
    path: 'panel-admin',
    loadComponent: () =>
      import('./pages/admin/panel-admin/panel-admin.page').then((m) => m.PanelAdminPage),
  },
  {
    path: 'panel-admin/view-books',
    loadComponent: () =>
      import('./pages/admin/view-books/view-books.page').then((m) => m.ViewBooksPage),
  },
  {
    path: 'panel-admin/view-users',
    loadComponent: () =>
      import('./pages/admin/view-users/view-users.page').then((m) => m.ViewUsersPage),
  },
  {
    path: 'logout',
    loadComponent: () => import('./routes/auth/pages/logout/logout.page').then( m => m.LogoutPage)
  },
];
