import { Component, inject, OnInit, signal, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/model/book';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MainStoreService } from 'src/app/services/main-store.service';
import { IonicModule } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.page.html',
  styleUrls: ['./my-books.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule]
})


export class MyBooksPage implements OnInit {
  private router = inject(Router);
  private bookService = inject(BookService);

  books = signal<Book[]>([]);

  constructor() { addIcons({ 'trash-outline': trashOutline }); }

  async ngOnInit() {
    this.loadBooks.reload();
  }

  loadBooks = resource<Book[],unknown>({
    loader: async () => {
      const data = await this.bookService.userBooks();
      this.books.set(data);
      return data;
    }
  });

  async deleteBook(bookId: number) {
    const confirmado = confirm('¿Estás seguro de que deseas eliminar este libro?');
    if (!confirmado) return;
    try {
      await this.bookService.deleteBookAsUser(bookId);
      this.loadBooks.reload();
    } catch (error) {
      console.error('Error al eliminar el libro', error);
    }
  }

  ionViewWillEnter() {
    this.loadBooks.reload();
  }
  

  goToBook(bookId: number) {
    this.router.navigate(['/books', bookId]);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
