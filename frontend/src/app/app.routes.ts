import { Routes } from '@angular/router';
import { authenticatedGuard } from './guards/authenticated.guard';

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
    canActivate: [authenticatedGuard],
    loadComponent: () =>
      import('./routes/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'books/:id',
    loadComponent: () =>
      import('./routes/book/book.page').then((m) => m.BookPage),
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
      import('./routes/user-profile/user-profile.page').then((m) => m.UserProfilePage),
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
  {
    path: 'usuarios-listado',
    canActivate: [authenticatedGuard],
    loadComponent: () => import('./routes/protegida/usuarios-listado/usuarios-listado.page').then((m) => m.UsuariosListadoPage)
  },
  {
    path: 'modify-user',
    loadComponent: () => import('./routes/protegida/modify-user/modify-user.page').then( m => m.ModifyUserPage)
  },
  {
    path: 'publish-book',
    loadComponent: () => import('./routes/publish-book/publish-book.page').then( m => m.PublishBookPage)
  },
  {
    path: 'my-books',
    //canActivate: [authenticatedGuard],
    loadComponent: () => import('./routes/my-books/my-books.page').then( m => m.MyBooksPage)
  },
  {
    path: 'modify-user',
    loadComponent: () => import('./routes/protegida/modify-user/modify-user.page').then( m => m.ModifyUserPage)
  }
];
