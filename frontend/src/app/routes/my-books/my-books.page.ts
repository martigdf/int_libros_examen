import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonCardSubtitle, IonCardHeader, IonCard, IonCardTitle, IonRow, IonGrid } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/model/book';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.page.html',
  styleUrls: ['./my-books.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCardTitle, IonCard, IonCardHeader, IonCardSubtitle, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})


export class MyBooksPage implements OnInit {

  private httpClient = inject(HttpClient);
  private router = inject(Router);

  books: Book[] = [
    {
      id: 0,
      name: 'Book Name',
      author: 'Author Name',
      image: '',
      state: 'available'
    },
    {
      id: 0,
      name: 'Book Name',
      author: 'Author Name',
      image: '',
      state: 'available'
    },
    {
      id: 0,
      name: 'Book Name',
      author: 'Author Name',
      image: '',
      state: 'available'
    },
    {
      id: 0,
      name: 'Book Name',
      author: 'Author Name',
      image: '',
      state: 'available'
    },
    {
      id: 0,
      name: 'Book Name',
      author: 'Author Name',
      image: '',
      state: 'available'
    },
    {
      id: 0,
      name: 'Book Name',
      author: 'Author Name',
      image: '',
      state: 'available'
    },
    {
      id: 0,
      name: 'Book Name',
      author: 'Author Name',
      image: '',
      state: 'available'
    },
    {
      id: 0,
      name: 'Book Name',
      author: 'Author Name',
      image: '',
      state: 'available'
    },
    {
      id: 0,
      name: 'Book Name',
      author: 'Author Name',
      image: '',
      state: 'available'
    }
  ];

  constructor() { }

  async ngOnInit() {
    await this.loadBooks();
  }

  async loadBooks() {
    try {
      const data = await firstValueFrom(this.httpClient.get<Book[]>('/my-books'));
      this.books = data;
    } catch (error) {
      console.error('Failed to load books', error);
    }
  }

  goToBook(bookId: number) {
    this.router.navigate(['/books', bookId]);
  }

}
