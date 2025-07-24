import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonMenuButton, IonMenuToggle, IonTitle, IonToolbar, IonButton, IonItem } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-menu-loans',
  templateUrl: './menu-loans.page.html',
  styleUrls: ['./menu-loans.page.scss'],
  standalone: true,
  imports: [IonItem, IonButton, IonMenuButton, IonMenuToggle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class MenuLoansPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
