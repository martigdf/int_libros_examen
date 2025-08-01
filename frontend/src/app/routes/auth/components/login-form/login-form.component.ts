import { Component, output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCol, IonRow, IonInput, IonButton, IonGrid, IonContent } from "@ionic/angular/standalone";
import { Login  } from 'src/app/model/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  imports: [IonCol, IonRow, IonInput, IonButton, FormsModule, IonGrid, IonContent]
})

export class LoginFormComponent {

  @Input() model: Login = { email: '', password: '' };

  public submitted = output<Login>();

  public email = ''
  public password = ''

  constructor(private router: Router) {}
  

  async onSubmit() {

    this.submitted.emit(this.model);

  }

  async register() { 
    this.router.navigate(['/register']);
  }

  // alert(`Username: ${this.username()}, Password: ${this.password()}`);

}
