import { Component, OnInit ,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Genre } from 'src/app/model/genre';
import { BookPost } from 'src/app/model/book';
import { BookService } from 'src/app/services/book.service';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
//import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
@Component({
  selector: 'app-publish-book',
  templateUrl: './publish-book.page.html',
  styleUrls: ['./publish-book.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule ]
})
export class PublishBookPage implements OnInit {

  book = signal<BookPost>({
    name: '',
    description: '',
    author: '',
    location: '',
    genres: []
  });

  genres: Genre[] = [];

  constructor(private bookService: BookService, private router: Router) { }

  async ngOnInit() {
    this.genres = await this.bookService.getGenres();
  }

  async onSubmit() {
    try {
      await this.bookService.publishBook(this.book());
      alert('Libro publicado correctamente!!');
      this.router.navigate(['/home']);
    } catch (err) {
      console.error('Error al publicar libro :(', err);
      alert('Error al publicar libro');
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
