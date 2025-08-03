import { Component, OnInit, inject, signal, resource } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { Book } from 'src/app/model/book';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { BookService } from 'src/app/services/book.service';
import { MainStoreService } from 'src/app/services/main-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class HomePage  implements OnInit {
  private bookService = inject(BookService);
  public mainStore = inject(MainStoreService);

  public booksSignal = signal<Book[]>([]);
  public userSignal = signal<User | null>(null);

  constructor(private router: Router) { }

  async ngOnInit() {
  }

  public allBooks = resource<Book[], unknown>({
    loader: async () => {
      const books = await this.bookService.getAllBooks();
      this.booksSignal.set(books);
      return books;
    }
  });

  ionViewWillEnter() {
    this.allBooks.reload();
  }
  
  modificarUsuario(id: string) {
    this.router.navigate([`/panel-admin/modify-user`, id]);
  }

  viewDetails(bookId: number) {
    this.router.navigate([`/books/${bookId}`]);
  }

  get currentUserId(): number {
    return +(this.mainStore.userId() ?? '-1');
  }
}
