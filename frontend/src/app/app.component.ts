
import { Component } from '@angular/core';
import { IonApp, IonMenu, IonContent, IonRouterOutlet, IonToolbar, IonHeader, IonTitle, IonButtons, IonMenuButton, IonFooter, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MainStoreService } from './services/main-store.service';
import { MenuController } from '@ionic/angular';
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

  isLoggedIn(): boolean {
    return this.mainStore.token() !== null;
  }

  logout() {
    this.mainStore.clearAuth();
    this.menuCtrl.close();
    this.router.navigate(['/login']).then(() => {
      location.reload(); 
    });
  }
}
