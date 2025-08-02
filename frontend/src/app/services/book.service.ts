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

export class BookService {

  private usuariosService = inject(UsuariosService);
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() { }

  // Método para obtener los géneros de libros
  async getGenres(): Promise<Genre[]> {
    return await firstValueFrom(this.httpClient.get<Genre[]>(`${this.apiUrl}books/genres`));
  }

  // Método para publicar un libro
  async publishBook(book: BookPost): Promise<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return await firstValueFrom(
      this.httpClient.post(`${this.apiUrl}books/publish`, book, { headers })
    );
  }

  // Método para obtener todos los libros
  async getAllBooks(): Promise<Book[]> {
    return await firstValueFrom(this.httpClient.get<Book[]>(`${this.apiUrl}books`));
  }

  // Método para obtener un libro por su ID
  async getBookById(id: number): Promise<Book> {
    return await firstValueFrom(this.httpClient.get<Book>(`${this.apiUrl}books/${id}`));
  }


  // Método para eliminar un libro
  async deleteBook(id: string): Promise<void> {
    return firstValueFrom(this.httpClient.delete<void>(`${this.apiUrl}books/${id}`));
  }

  async submitPhoto( book_id: number, photo: string) {

    const id = this.usuariosService.getUserId()

    if ( id === undefined || photo === '' ) {

      return

    }

    const response = await fetch(photo);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('file', blob, book_id + '.jpg')

    await firstValueFrom(this.httpClient.put(this.apiUrl + 'photos/books/' + book_id, formData));

  }

}
