import { Component, Injectable, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCol, IonRow, IonInput, IonButton, IonContent, IonApp, IonGrid } from "@ionic/angular/standalone";
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular/standalone';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonCol, IonRow, IonInput, IonButton, FormsModule, IonContent, IonApp, IonGrid]
})

@Injectable({
  providedIn: 'root',
  useClass: LoginPage,
  deps: [NavController, HttpClient]
})

export class LoginPage implements OnInit {

  public username = ''
  public password = ''

  constructor(private NavController: NavController) { }

  ngOnInit() {

  }

  onSubmit() {

    if (this.username === '' || this.password === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (this.username === 'username' && this.password === 'password') {
      alert('Login successful');
      this.NavController.navigateRoot('/home');
    } else {
      alert('Login failed');
    }
  }
  

}
