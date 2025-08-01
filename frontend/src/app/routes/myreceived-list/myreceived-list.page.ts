import { Component, OnInit, inject, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { RequestsService } from 'src/app/services/request.service';
import { Request } from 'src/app/model/request';  

@Component({
  selector: 'app-myreceived-list',
  templateUrl: './myreceived-list.page.html',
  styleUrls: ['./myreceived-list.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonLabel, IonItem, IonList, IonContent, CommonModule, FormsModule]
})
export class MyreceivedListPage implements OnInit {

  private requestService = inject(RequestsService);

  receivedRequests = resource<Request[], unknown>({
    loader: async () => {
      const data = await this.requestService.getReceivedRequests();
      const filtered = data.filter(req => req.state === 'pending');
      return filtered;
    }
  });


  constructor() { }

  ngOnInit() {
  }

}
