import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, UserPost } from '../model/user';
import { firstValueFrom } from 'rxjs';
import { MainStoreService } from './main-store.service';
import { signal } from '@angular/core';
import { PutUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private apiUrl = environment.apiUrl
  private httpClient = inject(HttpClient);
  private mainStore = inject(MainStoreService);

  public id = signal<User | undefined>(undefined);

  // Método para obtener el usuario actual
  async getAll(): Promise<User[]> {
    return firstValueFrom(this.httpClient.get<User[]>(this.apiUrl + "users/all"))
  }

  // Método para obtener el usuario por ID
  getUserId(): User | undefined {
    return this.id();
  }

  // Metodo para crear un usuario
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

  // Método para actualizar un usuario
  async putUser(id: string, data: PutUser) {
    const url = `${this.apiUrl}users/${id}`;
    return await firstValueFrom(this.httpClient.put<PutUser>(url, data));
  }

  // Método para obtener el usuario por ID
  async getById(id_usuario:number){
    return firstValueFrom(this.httpClient.get<User>(this.apiUrl+"users"+"/"+id_usuario));
  }

  async submitPhoto(photo: string) {

    if ( this.id === undefined || photo === '' ) {

      return

    }

    const response = await fetch(photo);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('file', blob, this.id + '.jpg')

    await firstValueFrom(this.httpClient.put(this.apiUrl + 'photos/users/' + this.id, formData));

  }
  
  constructor() { }

}
