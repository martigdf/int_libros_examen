import { Component, OnInit,inject, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { UserFormComponent } from "../components/user-form/user-form.component";
import { User } from 'src/app/model/user';
import { PutUser } from 'src/app/model/user';
import { Router } from '@angular/router';
import { MainStoreService } from 'src/app/services/main-store.service';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.page.html',
  styleUrls: ['./modify-user.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, UserFormComponent]
})
export class ModifyUserPage implements OnInit {

  private usuarioService = inject(UsuariosService);
  private route = inject(ActivatedRoute);
  private mainStore = inject(MainStoreService);
  private router = inject(Router);
  user = signal<User | null>(null);
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadUsuario(id);
  }

  private async loadUsuario(id: string) {
    const user = await this.usuarioService.getById(parseInt(id));
    this.user.set(user);
  }

  async handleSave(payload: PutUser) {
    const currentUser = this.user();
    if (!currentUser) return;

    const updatedData = await this.usuarioService.putUser(currentUser.id, payload);
    const updatedUser: User = { ...currentUser, ...updatedData };

    // Actualiza signal y localStorage usando setUser
    this.mainStore.setUser(updatedUser);

    this.router.navigate(['/panel-admin/usuarios-listado']);
  }
}
