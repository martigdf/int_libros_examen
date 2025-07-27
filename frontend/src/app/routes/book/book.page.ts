import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Book } from 'src/app/model/book';
import { environment } from 'src/environments/environment.prod';
import { IonHeader, IonToolbar, IonCardHeader, IonCard, IonContent, IonCardContent, IonCardSubtitle, IonLabel, IonCardTitle, IonText, IonItem, IonTitle, IonButton } from "@ionic/angular/standalone";
//import { Router } from '@angular/router';
//import { MainStoreService } from 'src/app/services/main-store.service';
import { CommonModule } from '@angular/common';
//import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
  standalone: true,
  imports: [IonTitle, CommonModule, IonItem, IonText, IonCardTitle, IonLabel, IonCardSubtitle, IonCardContent, IonContent, IonCardHeader, IonCard, IonHeader, IonCardTitle, IonText, IonToolbar],
})

export class BookPage implements OnInit {

  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl
  private route = inject(ActivatedRoute);
  //private mainStore = inject(MainStoreService);
  

  public book!: Book;
  public currentUserId!: number;
  
  ngOnInit() {    
    
    /*this.book = {
      id: 0,
      name: 'Book Name',
      author: 'Author Name',
      state: 'available'
    }*/
    
    this.loadBook();
    //const user = this.userService.getUserId();
   // this.currentUserId = user ? user.id : 0;
  }

  //private tokenObject = this.mainStore.token();

  async loadBook() {

    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    
    const data = await firstValueFrom(
      this.httpClient.get<Book>(this.apiUrl + 'books/' + bookId)
    );

    this.book = data;
    
  }

  // Método para eliminar el libro siendo el propietario
  /*
  async deleteBook() {
    const confirmDelete = confirm('¿Seguro que deseas eliminar este libro?');
    if (!confirmDelete) return;

    try {
      await firstValueFrom(
        this.httpClient.delete(`${this.apiUrl}books/${this.book.id}`, {
          headers: { Authorization: `Bearer ${this.tokenObject}` }
        })
      );

      alert('Libro eliminado correctamente');
      this.router.navigate(['/my-books']);
    } catch (error) {
      console.error('Error al eliminar libro:', error);
      alert('No se pudo eliminar el libro');
    }
  }
  */

}