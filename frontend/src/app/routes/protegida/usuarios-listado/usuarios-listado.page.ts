import { Component, inject, OnInit, resource } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { IonContent, IonList, IonItem, IonLabel, IonText, IonCardContent, IonBadge } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";
import { User } from 'src/app/model/user';

const socket = new WebSocket("ws://localhost/backend/")

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.page.html',
  styleUrls: ['./usuarios-listado.page.scss'],
  standalone: true,
  imports: [IonBadge, IonCardContent, CommonModule, FormsModule, JsonPipe, IonicModule]
})

export class UsuariosListadoPage implements OnInit {

  private usuarioService = inject(UsuariosService)
  
  public usuariosSignal = resource<User[], unknown>({

    loader : () => this.usuarioService.getAll()
  
  });

  constructor() { }

  ngOnInit() {
  
    socket.addEventListener("open", (event) => {

      console.log("Conexión establecida")

    })

    socket.addEventListener("message", (event) => {
      
      if (event.data == 'usuario') {

        this.usuariosSignal.reload();

      }
      
    })

  }

  

}
