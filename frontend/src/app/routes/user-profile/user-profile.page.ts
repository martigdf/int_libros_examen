import { Component, inject, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { MainStoreService } from 'src/app/services/main-store.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  imports: [IonicModule],
  styleUrls: ['./user-profile.page.scss'],
  standalone: true
})
export class UserProfilePage implements OnInit {

  public user: any;
  private usuariosService = inject(UsuariosService);
  private alertCtrl = inject(AlertController);
  private router = inject(Router);
  private store = inject(MainStoreService);

  ngOnInit() {
    this.user = this.store.getUser(); 
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  async deleteSelf() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres eliminar tu cuenta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.usuariosService.deleteUser(this.user.id);
              this.store.clearSession();
              this.router.navigate(['/login']);
            } catch (error) {
              console.error('Error al eliminar el usuario:', error);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
