import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-publish-book',
  templateUrl: './publish-book.page.html',
  styleUrls: ['./publish-book.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PublishBookPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
