import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { inject } from '@angular/core';
import { Genre } from 'src/app/model/genre';
import { firstValueFrom } from 'rxjs';
import { BookPost } from 'src/app/model/book';
import { HttpHeaders } from '@angular/common/http';
import { Book } from 'src/app/model/book';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  private usuariosService = inject(UsuariosService);
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() { }

  //Metodo para eliminar un libro siendo admin
  async deleteBookAsAdmin(id: string): Promise<void> {
    return firstValueFrom(this.httpClient.delete<void>(`${this.apiUrl}admin/books/${id}`));
  }
}