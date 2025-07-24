import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private apiUrl = environment.apiUrl
  private httpClient = inject(HttpClient);

  async getAll() {

    return firstValueFrom(this.httpClient.get<User>(this.apiUrl + "users"))

  }

  constructor() { }

}
