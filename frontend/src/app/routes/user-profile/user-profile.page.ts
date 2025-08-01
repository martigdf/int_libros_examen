import { Component, inject, OnInit, computed } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainStoreService } from 'src/app/services/main-store.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  imports: [IonicModule, CommonModule],
  styleUrls: ['./user-profile.page.scss'],
  standalone: true
})
export class UserProfilePage implements OnInit {

  private usuariosService = inject(UsuariosService);
  private alertCtrl = inject(AlertController);
  private router = inject(Router);
  public mainStore = inject(MainStoreService);

  public user = signal<any | null>(null);
  public usuarioId = computed(() => this.mainStore.usuario()?.id ?? '');

  async ngOnInit() {
    const current = JSON.parse(localStorage.getItem('user') || '{}');
    if (current?.id) {
      // Fetch user data by ID
      const data = await this.usuariosService.getById(current.id);
      this.user.set(data);
    }
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
              await this.usuariosService.deleteUser(this.user()?.id);
              localStorage.removeItem('user');
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
