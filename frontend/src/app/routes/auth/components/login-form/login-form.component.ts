import { Component, effect, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCol, IonRow, IonInput, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [IonCol, IonRow, IonInput, IonButton, FormsModule],
})

export class LoginFormComponent  implements OnInit {

  public username = signal("username");
  public password = signal("password");

  constructor() { }

  ngOnInit() {

  }

  public efecto = effect( () => {
    
    const texto = this.username().toUpperCase();
    console.log(texto);

  });

  onSubmit() {

    alert(`Username: ${this.username()}, Password: ${this.password()}`);

  }

}
