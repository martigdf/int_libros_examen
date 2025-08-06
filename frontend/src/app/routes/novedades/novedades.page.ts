import { Component, inject, OnInit, signal, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { MainStoreService } from 'src/app/services/main-store.service';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/services/book.service';
import { RequestPost } from 'src/app/model/request';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from 'src/app/services/request.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.page.html',
  styleUrls: ['./novedades.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonicModule]
})
export class NovedadesPage implements OnInit {

  public mainStore = inject(MainStoreService);
  public requestsService = inject(RequestsService);
  public bookService = inject(BookService);
  private alertCtrl = inject(AlertController);
  public booksSignal = signal<Book[]>([]);

  book = signal<any>(null);
  bookPhoto = signal<string>('');
  receiver_user_id = signal<number>(0);
  private route = inject(ActivatedRoute);
  requestResult = signal<RequestPost | null>(null);

  constructor() { }

  public allBooksFiltered = resource<Book[], unknown>({
    loader: async () => {
      const books = await this.bookService.getAllBooks();
      this.booksSignal.set(books);
      return books;
    }
  });

  loadBook = resource<Book, unknown>({
    loader : async () => {

      const bookId = Number(this.route.snapshot.paramMap.get('id'));
      const book = await this.bookService.getById(bookId);

      if (!book) {
        throw new Error('No se pudo cargar el libro');
      }

      this.book.set(book); 
      this.receiver_user_id.set(book.owner_id);

      return book!;

    }
  });

  async requestBook() {
      const currentBook = this.book();
  
      if (!currentBook) {
        await this.showAlert('Error', 'No se pudo obtener la información del libro.');
        return;
      }
  
      // Verificar si el libro está disponible
      const payload: RequestPost = {
        receiver_user_id: this.receiver_user_id(),
        books: [currentBook.id]
      };
  
      try {
        // Llamar al servicio para crear la solicitud
        const res = await this.requestsService.createRequest(payload);
        await this.showAlert('Éxito', 'Solicitud creada correctamente.');
        this.requestResult.set(res);
        console.log('Solicitud creada:', res);
        this.loadBook.reload();
      } catch (err) {
        console.error('Error al crear la solicitud:', err);
        await this.showAlert('Error', 'No se pudo crear la solicitud.');
      }
    }

    private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
