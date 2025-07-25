import { Component, OnInit } from '@angular/core';
import { NavbarPage } from '../pages/navbar/navbar.page';
import { IonToolbar, IonHeader, IonButtons, IonTitle, IonMenuButton, IonContent, IonRouterOutlet } from "@ionic/angular/standalone";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [NavbarPage, IonToolbar, IonHeader, IonButtons, IonTitle, IonMenuButton, IonContent, RouterOutlet, IonRouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
