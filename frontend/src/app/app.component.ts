
import { Component } from '@angular/core';
import { IonApp, IonMenu, IonContent, IonRouterOutlet, IonToolbar, IonHeader, IonTitle, IonButtons, IonMenuButton, IonFooter } from '@ionic/angular/standalone';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonMenu, IonContent, IonRouterOutlet, IonToolbar, IonHeader, IonTitle, IonButtons, IonMenuButton, IonFooter],
})
export class AppComponent {
  
  constructor() { }

}
