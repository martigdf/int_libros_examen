import { Component, OnInit } from '@angular/core';
import { IonButton, IonContent, IonRow, IonGrid, IonCol } from "@ionic/angular/standalone";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonButton, IonContent, IonRow, IonGrid, IonCol],
})
export class HomePage  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  verUsuariosList() {
    this.router.navigate(['/usuarios-listado']);
  }
}
