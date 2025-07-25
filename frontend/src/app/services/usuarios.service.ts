import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, UserPost } from '../model/user';
import { firstValueFrom } from 'rxjs';
import { MainStoreService } from './main-store.service';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private apiUrl = environment.apiUrl
  private httpClient = inject(HttpClient);
  private mainStore = inject(MainStoreService);

  async getAll() {
    return firstValueFrom(this.httpClient.get<User>(this.apiUrl + "users/all"))
  }

  async postUser(data: UserPost) {
    const url = this.apiUrl + "users/register";
    const userConRol: UserPost = {
      ...data,
      role: 'user'
    };
    console.log("Datos enviados al backend:", userConRol);

    return await firstValueFrom(
      this.httpClient.post<User>(url, userConRol)
    );
  }

  constructor() { }

}
