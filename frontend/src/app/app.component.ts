import { Component, computed, signal } from '@angular/core';
import { IonApp, IonMenu, IonContent, IonRouterOutlet, IonToolbar, IonHeader, IonTitle, IonButtons, IonMenuButton, IonFooter, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MainStoreService } from './services/main-store.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from './model/user';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonMenu, IonContent, FormsModule, CommonModule, IonRouterOutlet, IonToolbar, IonHeader, IonTitle, IonButtons, IonMenuButton, IonFooter, IonButton],
})
export class AppComponent {

  public mainStore = inject(MainStoreService);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);

  public isHome = signal<boolean>(false);
  public usuario = signal<User | null>(null);
  public usuarioId = computed(() => this.mainStore.usuario()?.id ?? '');

  constructor() {
    this.router.events.subscribe(() => {
      this.isHome.set(this.router.url === '/home');
    });
  }

  isLoggedIn(): boolean {
    return this.mainStore.token() !== null;
  }

  async logout() {
    try {
      await this.httpClient.post(`${this.apiUrl}auth/logout`, {}, {
        headers: { Authorization: `Bearer ${this.mainStore.token()}` }
      }).toPromise();
    } catch {
      console.warn('El backend no respondió al logout, continuamos.');
    }

    this.mainStore.clearAuth();
    this.router.navigate(['/login']).then(() => {
      location.reload(); 
    });
  }

  verUsuariosList() {
    this.router.navigate(['/panel-admin/usuarios-listado']);
  }

  verLibrosList() {
    this.router.navigate(['/panel-admin/view-books']);
  }

  publicarLibro() {
    this.router.navigate(['/publish-book']);
  }

  perfilUsuario(id: string) {
    this.router.navigate(['/user-profile', id]);
  }

  misLibros() {
    this.router.navigate(['/my-books']);
  }

  misSolicitudes() {
    this.router.navigate(['/myreque-list']);
  }

  misRecibidas() {
    this.router.navigate(['/myreceived-list']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  public isAdmin = computed(() => {
    const isAdmin = this.usuario()?.role === 'admin';
    console.log('isAdmin:', isAdmin);
    return isAdmin;
  });

  public isUser = computed(() => {
    const isUser = this.usuario()?.role === 'user';
    console.log('isUser:', isUser);
    return isUser;
  });

  public isAdminAndUser = computed(() => {
    const user = this.usuario();
    const isBoth = user?.role === 'admin' || user?.role === 'user';
    console.log('isAdminAndUser:', isBoth);
    return isBoth;
  });

}
