import { Component, OnInit, inject, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonText, IonImg } from '@ionic/angular/standalone';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.page.html',
  styleUrls: ['./view-books.page.scss'],
  standalone: true,
  imports: [IonImg, IonText, IonButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ViewBooksPage implements OnInit {

  private booksService = inject(BookService);
  private router = inject(Router);

  public librosSignal = resource<Book[], unknown>({
    loader: () => this.booksService.getAllBooks()
  });

  async eliminarLibro(id: string) {
    await this.booksService.deleteBook(id);
    this.librosSignal.reload();
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }


  constructor() { }

  ngOnInit() {
  }

}
