import { Component, inject, OnInit, resource } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { IonContent, IonList, IonItem, IonLabel, IonText, IonCardContent, IonBadge } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

const socket = new WebSocket("ws://localhost/backend/")

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.page.html',
  styleUrls: ['./usuarios-listado.page.scss'],
  standalone: true,
  imports: [IonBadge, IonCardContent, CommonModule, FormsModule, IonicModule]
})

export class UsuariosListadoPage implements OnInit {

  private usuarioService = inject(UsuariosService)
  private alertCtrl = inject(AlertController);
  
  public usuariosSignal = resource<User[], unknown>({

    loader : () => this.usuarioService.getAll()
  
  });

  constructor(private router: Router) { }

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

  modificarUsuario(id: string) {
    this.router.navigate([`/panel-admin/modify-user`, id]);
  }

  async eliminarUsuario(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres eliminar este usuario?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            try {
              await this.usuarioService.deleteUser(id);
              this.usuariosSignal.reload();
            } catch (error) {
              console.error('Error al eliminar usuario', error);
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
