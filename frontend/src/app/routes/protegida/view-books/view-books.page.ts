import { Component, OnInit, inject, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/model/book';
import { IonicModule } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.page.html',
  styleUrls: ['./view-books.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewBooksPage implements OnInit {

  private adminService = inject(AdminService);
  private booksService = inject(BookService);

  public librosSignal = resource<Book[], unknown>({
    loader: () => this.booksService.getAllBooks()
  });

  async eliminarLibro(id: string) {
    const confirmado = confirm('¿Estás seguro de que deseas eliminar este libro?');
    if (!confirmado) {
      return;
    }
    await this.adminService.deleteBookAsAdmin(id);
    this.librosSignal.reload();
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  constructor() { }

  ngOnInit() {
  }

}
