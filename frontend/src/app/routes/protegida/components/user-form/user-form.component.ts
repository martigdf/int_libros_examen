import { Component, OnInit, input, output, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/model/user';
import { ErrorMessagePipe } from 'src/app/pipes/error-message.pipe';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [IonicModule, FormsModule, ErrorMessagePipe, JsonPipe],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent  implements OnInit {

  public totalRoles = input<string[]>(['admin', 'user']);
  public usuario = input<User>({
    name: '', role: [''],
    id: 0,
    last_name: '',
    email: ''
  });  //Si no se setea arranca con usuario vacío.
  public name = signal<string>(this.usuario().name);
  public roles = signal<string[]>(this.usuario().role);
  public last_name = signal<string>(this.usuario().last_name);
  public email = signal<string>(this.usuario().email);
  public cambiado = output<User>();
  role: any;

  constructor() { }

  ngOnInit() {}

  /*
  onRoleChange (event:any,rol:string) {
    console.log({event});
    console.log(rol);
    const actual = this.roles();
    if (event.detail.checked) {
      this.roles.set([...actual, rol]);
    } else {
      this.roles.set(actual.filter(r => r !== rol));
    }
    console.log("ROLES: ",this.roles());
  }
  */

  onSelectChange (event:any) {
    console.log({event});
    this.roles.set(event.detail.value);
    console.log("ROLES: ",this.roles());
  }

  onSubmit(){
    const usuarioModificado : User = {
      id: this.usuario().id,
      name: this.name(),
      role: this.roles(),
      last_name: this.last_name(),
      email: this.email()
    }
    this.cambiado.emit(usuarioModificado);
  }
}
