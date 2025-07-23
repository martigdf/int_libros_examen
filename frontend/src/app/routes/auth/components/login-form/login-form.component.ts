import { Component, Injectable, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCol, IonRow, IonInput, IonButton } from "@ionic/angular/standalone";
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [IonCol, IonRow, IonInput, IonButton, FormsModule]
})

@Injectable({
  providedIn: 'root',
  useClass: LoginFormComponent,
  deps: [NavController, HttpClient]
})

export class LoginFormComponent  implements OnInit {

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
    
    //this.http.post('http://localhost:3000/auth/login', payload).subscribe({
    //  next: (res: any) => {
    //    console.log('Login successful', res);
    //    // Save JWT, navigate, etc.
    //    localStorage.setItem('token', res.token);
    //  },
    //  error: (err: any) => {
    //    console.error('Login failed', err);
    //    alert('Invalid username or password.');
    //  }
    //});

    // alert(`Username: ${this.username()}, Password: ${this.password()}`);

  }

}
