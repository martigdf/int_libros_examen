
import { Component } from '@angular/core';
import { IonApp, IonMenu, IonContent, IonRouterOutlet, IonToolbar, IonHeader, IonTitle, IonButtons, IonMenuButton, IonFooter, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MainStoreService } from './services/main-store.service';
import { MenuController } from '@ionic/angular';
import { UsuariosService } from './services/usuarios.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonMenu, IonContent, IonRouterOutlet, IonToolbar, IonHeader, IonTitle, IonButtons, IonMenuButton, IonFooter, IonButton],
})
export class AppComponent {
  
  constructor() { }

  private mainStore = inject(MainStoreService);
  private router = inject(Router);
  private menuCtrl = inject(MenuController);
  private usuariosService = inject(UsuariosService);
  private apiUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);

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
}
