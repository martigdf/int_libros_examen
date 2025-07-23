import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonMenuButton, IonMenuToggle, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu-loans',
  templateUrl: './menu-loans.page.html',
  styleUrls: ['./menu-loans.page.scss'],
  standalone: true,
  imports: [IonButton, IonMenuButton, IonMenuToggle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MenuLoansPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
