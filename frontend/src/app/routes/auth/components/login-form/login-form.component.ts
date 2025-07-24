import { Component, inject, Injectable, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCol, IonRow, IonInput, IonButton } from "@ionic/angular/standalone";
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment.prod';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/model/user';
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

  private httpClient = inject(HttpClient);
  private NavController = inject(NavController);
  private apiUrl = environment.apiUrl;

  ngOnInit() {

  }

  async onSubmit() {

    if (this.username === '' || this.password === '') {
      
      alert('Por favor, complete todos los campos.');
      return;
    
    }

    const respuesta = await this.doAuth(this.username, this.password)
    
    const token = await this.doAuth(this.username, this.password);
    console.log(token);

    const url = this.apiUrl + "auth/profile"
    const user = await firstValueFrom(this.httpClient.get<User>(url, {headers : {
      "Authorization" : "Bearer " + respuesta.token
    }}));
    alert(user)

    /*if (false) {
      
      this.doAuth(this.username, this.password);
      
      alert('Login successful');
      
      this.NavController.navigateRoot('/home');
    
    } else {
      
      alert('Login failed');
      
    }*/

  }

  private doAuth(username: string, password: string) {
  
    const url = this.apiUrl + '/auth/login';
    const data = { username, password };

    const myObservable = this.httpClient.post<{token:string}>(url, data);

    return firstValueFrom(
      
      this.httpClient.post<{token:string}>(url, data)

    );

  }

  // alert(`Username: ${this.username()}, Password: ${this.password()}`);



}
