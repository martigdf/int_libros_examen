import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenuButton, IonMenu, IonMenuToggle, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons } from '@ionic/angular/standalone'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
  standalone: true,
  imports: [IonButtons, IonMenuButton, RouterLink, IonMenu, IonMenuToggle, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NavbarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
