import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardTitle, IonCardHeader, IonCardContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardHeader, IonCardTitle, IonCard, IonCol, IonRow, IonGrid, IonButton, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class UserProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
