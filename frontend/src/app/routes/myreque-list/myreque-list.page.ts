import { Component, OnInit, resource, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { RequestsService } from 'src/app/services/request.service';
import { Request } from 'src/app/model/request';

@Component({
  selector: 'app-myreque-list',
  templateUrl: './myreque-list.page.html',
  styleUrls: ['./myreque-list.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonLabel, IonItem, IonList, IonContent, CommonModule, FormsModule]
})
export class MyrequeListPage implements OnInit {

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.sentRequests.reload();
  }
  
  private requestService = inject(RequestsService);

  sentRequests = resource<Request[], unknown>({
    loader: async() => {
      const data = await this.requestService.getSentRequests();
      return data;
    }
  });

  trackById(index: number, item: Request) {
    return item.id;
  }

  constructor() { }
}
