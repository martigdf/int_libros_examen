import { Component, inject, Injectable, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCol, IonRow, IonInput, IonButton, IonGrid, IonContent } from "@ionic/angular/standalone";
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment.prod';
import { firstValueFrom } from 'rxjs';
import { User, Token, Login  } from 'src/app/model/user';
import { MainStoreService } from 'src/app/services/main-store.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  imports: [IonCol, IonRow, IonInput, IonButton, FormsModule, IonGrid, IonContent]
})

@Injectable({
  providedIn: 'root',
  useClass: LoginFormComponent,
  deps: [NavController, HttpClient]
})

export class LoginFormComponent {

  public submitted = output<Login>();

  public email = ''
  public password = ''

  constructor(private router: Router) {}

  async onSubmit() {

    const datos: Login = {
      email: this.email,
      password: this.password
    }

    this.submitted.emit(datos);

  }

  async register() { 
    this.router.navigate(['/register']);
  }

  // alert(`Username: ${this.username()}, Password: ${this.password()}`);

}
