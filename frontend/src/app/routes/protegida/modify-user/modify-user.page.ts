import { Component, OnInit, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { UserFormComponent } from "../components/user-form/user-form.component";
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.page.html',
  styleUrls: ['./modify-user.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, UserFormComponent]
})
export class ModifyUserPage implements OnInit {

  constructor( private usuarioService: UsuariosService,
    private route: ActivatedRoute) 
  { }
    
    public id!: string;
    public usuarioResource = resource({
    params : () => ({id_usuario : parseInt(this.id)}),
    loader: ({params}) => this.usuarioService.getById(params.id_usuario),
  });
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  onUsuarioModificado(usuario: User) {
    console.log("Usuario modificado desde el form:", usuario);
    this.usuarioService.putUser(usuario.id, usuario);
  }
}
