import { Component, OnInit } from '@angular/core';
import { NavbarPage } from '../pages/navbar/navbar.page';
import { IonToolbar, IonHeader, IonButtons, IonTitle, IonMenuButton, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-layout',
  imports: [NavbarPage, IonToolbar, IonHeader, IonButtons, IonTitle, IonMenuButton, IonContent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
