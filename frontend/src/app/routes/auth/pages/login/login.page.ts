import { Component, inject, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { MainStoreService } from 'src/app/services/main-store.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { Login, Token, User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [LoginFormComponent]
})
export class LoginPage implements OnInit {

  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private mainStore = inject(MainStoreService);

  constructor(){ }

  ngOnInit(){ }

  public async doAuth(data: Login) {
  
    const tokenObject: Token = await firstValueFrom(this.httpClient.post<Token>(this.apiUrl + "auth/login", data));

    const usuario = await firstValueFrom(this.httpClient.get<User>(this.apiUrl + "auth/profile", { headers : {"Authorization" : "Bearer " + tokenObject.token} }));
    
    return firstValueFrom(
      
      this.httpClient.post<Token>(this.apiUrl, data)

    );

  }

}
