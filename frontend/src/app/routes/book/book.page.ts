import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Book } from 'src/app/model/book';
import { environment } from 'src/environments/environment.prod';
import { CommonModule } from '@angular/common';
import { RequestsService } from 'src/app/services/request.service';
import { RequestPost } from 'src/app/model/request';
import { AlertController } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
  standalone: true,
  imports: [ CommonModule, IonicModule],
})

export class BookPage implements OnInit {

  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl
  private route = inject(ActivatedRoute);
  private requestsService = inject(RequestsService);
  private alertCtrl = inject(AlertController);


  book = signal<any>(null);
  receiver_user_id = signal<number>(0);
  requestResult = signal<RequestPost | null>(null);
  
  public currentUserId!: number;
  
  ngOnInit() {    
    this.loadBook();
  }

  // Método para cargar los detalles del libro
  async loadBook() {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));

    const data = await firstValueFrom(
      this.httpClient.get<Book>(this.apiUrl + 'books/' + bookId)
    );

    this.book.set(data);
    this.receiver_user_id.set(data.owner_id);
  }

  // Metodo para solicitar un préstamo del libro
  async requestBook() {
    const currentBook = this.book();

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

}