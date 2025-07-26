import { Component, OnInit } from '@angular/core';
import { IonButton, IonContent, IonRow, IonGrid, IonCol } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonButton, IonContent, IonRow, IonGrid, IonCol],
})
export class HomePage  implements OnInit {

  public user: User = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private router: Router) { }

  ngOnInit() {}

  verUsuariosList() {
    this.router.navigate(['/usuarios-listado']);
  }

  publicarLibro() {
    this.router.navigate(['/publish-book']);
  }

  modificarUsuario(id: number) {
    this.router.navigate([`/modify-user`, id]);
  }

  perfilUsuario(id: number) {
    this.router.navigate(['/user-profile', id]);
  }
}
