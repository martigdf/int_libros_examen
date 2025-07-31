import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-myreceived-list',
  templateUrl: './myreceived-list.page.html',
  styleUrls: ['./myreceived-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MyreceivedListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
