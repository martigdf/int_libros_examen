import { Component, OnInit, inject, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestsService } from 'src/app/services/request.service';
import { Request } from 'src/app/model/request';  
import { IonicModule } from '@ionic/angular';
import { MainStoreService } from 'src/app/services/main-store.service';

@Component({
  selector: 'app-myreceived-list',
  templateUrl: './myreceived-list.page.html',
  styleUrls: ['./myreceived-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MyreceivedListPage implements OnInit {

  private requestService = inject(RequestsService);
  private mainStore = inject(MainStoreService);

  allReceived = signal<Request[]>([]);
  pendingReceived = signal<Request[]>([]);
  acceptedRequests = signal<Request[]>([]);
  confirmados = signal<{ [key: number]: boolean }>({});

  public receivedRequests = resource<Request[], unknown>({
    loader: async () => {
      const data = await this.requestService.getReceivedRequests();
      this.allReceived.set(data);
      this.pendingReceived.set(data.filter(req => req.state === 'pending'));
      this.acceptedRequests.set(data.filter(req => req.state === 'accepted'));
      return data;
    }
  });

  async responderSolicitud(id: number, state: 'accepted' | 'declined') {
    console.log(`🔹 Respondiendo solicitud ${id} con estado ${state}`);
    this.requestService.responderSolicitud(id, state)
      .then(resp => {
        console.log('Respuesta backend responderSolicitud:', resp);
      })
      .catch(err => console.error('Error al responder solicitud:', err));
  }
  
  async confirmPickup(id: number) {
    console.log(`Enviando confirmación de retiro para solicitud ${id}`);
    try {
      const resp = await this.requestService.confirmPickup(id);
      console.log('Respuesta backend confirm-pickup:', resp);
      this.confirmados.update(prev => ({ ...prev, [id]: true }));
      this.receivedRequests.set(resp);
    } catch (err) {
      console.error('Error al confirmar retiro:', err);
    }
  }

  async confirmReturn(id: number) {
    try {
      const req = await this.requestService.confirmReturn(id);
      this.receivedRequests.set(req);
      this.receivedRequests.reload();
    } catch (err) {
      console.error('Error al confirmar devolución:', err);
    }
  }

  constructor() { }

  ngOnInit() {
    this.receivedRequests.reload();

    const token = this.mainStore.token();
    const socket = new WebSocket('ws://localhost/backend/?token=' + token);

    socket.addEventListener("open", (event) => {

      console.log("Conexión establecida")

    })

    socket.addEventListener("message", (event) => {

      if (event.data == 'requests') {

        this.receivedRequests.reload();

      }
      
    })
  }

}
