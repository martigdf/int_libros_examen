import { Component, OnInit, resource, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestsService } from 'src/app/services/request.service';
import { Request } from 'src/app/model/request';
import { IonicModule } from '@ionic/angular';
import { MainStoreService } from 'src/app/services/main-store.service';

@Component({
  selector: 'app-myreque-list',
  templateUrl: './myreque-list.page.html',
  styleUrls: ['./myreque-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MyrequeListPage implements OnInit {
  
  private requestService = inject(RequestsService);
  private mainStore = inject(MainStoreService);

  public requestSignal = signal<Request[]>([]);

  public sentRequests = resource<Request[], unknown>({
    loader: async() => {
      const data = await this.requestService.getSentRequests();
      this.requestSignal.set(data);
      return data;
    }
  });

  async ngOnInit() {
    this.sentRequests.reload();

    const token = this.mainStore.token();
    const socket = new WebSocket('ws://localhost/backend/?token=' + token);

    socket.addEventListener("open", (event) => {

      console.log("Conexión establecida")

    })

    socket.addEventListener("message", (event) => {

      if (event.data == 'requests') {

        this.sentRequests.reload();

      }
      
    })
  }

  async cancelarSolicitud(id: number) {
    try {
      await this.requestService.responderSolicitud(id, 'cancelled'); 
      this.sentRequests.reload();
    } catch (err) {
      console.error('Error al cancelar solicitud:', err);
    }
  }

  trackById(index: number, item: Request) {
    return item.id;
  }

  constructor() { }
}
