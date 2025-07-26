import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { IonicModule } from "@ionic/angular";
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MainStoreService } from 'src/app/services/main-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.page.html',
  styleUrls: ['./modify-user.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonicModule]
})
export class ModifyUserPage implements OnInit {

  constructor(private usuarioService: UsuariosService,
    private mainStore: MainStoreService,
    private router: Router) { }
  
  ngOnInit() {
  }

}
