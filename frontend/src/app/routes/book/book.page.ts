import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Book } from 'src/app/model/book';
import { environment } from 'src/environments/environment.prod';
import { IonHeader, IonToolbar, IonCardHeader, IonCard, IonContent, IonCardContent, IonCardSubtitle, IonLabel, IonCardTitle, IonText, IonItem, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
  standalone: true,
  imports: [IonTitle, IonItem, IonText, IonCardTitle, IonLabel, IonCardSubtitle, IonCardContent, IonContent, IonCardHeader, IonCard, IonHeader, IonCardTitle, IonText, IonToolbar],
  // ...
})
export class BookPage implements OnInit {

  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl
  private route = inject(ActivatedRoute);

  public book!: Book;
  
  ngOnInit() {    
    
    /*this.book = {
      id: 0,
      name: 'Book Name',
      author: 'Author Name',
      state: 'available'
    }*/
    
    this.loadBook();

  }

  async loadBook() {

    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    
    const data = await firstValueFrom(
      this.httpClient.get<Book>(this.apiUrl + 'books/' + bookId)
    );

    this.book = data;
    
  }

}