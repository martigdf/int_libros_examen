import { Component, OnInit, inject, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestsService } from 'src/app/services/request.service';
import { Request } from 'src/app/model/request';  
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-myreceived-list',
  templateUrl: './myreceived-list.page.html',
  styleUrls: ['./myreceived-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MyreceivedListPage implements OnInit {

  private requestService = inject(RequestsService);

  allReceived = signal<Request[]>([]);
  pendingReceived = signal<Request[]>([]);

  receivedRequests = resource<Request[], unknown>({
    loader: async () => {
      const data = await this.requestService.getReceivedRequests();
      this.allReceived.set(data);
      this.pendingReceived.set(data.filter(req => req.state === 'pending'));
      return data;
    }
  });

  responderSolicitud(id: number, state: 'accepted' | 'rejected') {
    this.requestService.responderSolicitud(id, state)
      .then(() => this.receivedRequests.reload())
      .catch(err => console.error('Error al responder la solicitud:', err));
  }

  constructor() { }

  ngOnInit() {
  }

}
