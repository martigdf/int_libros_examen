import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { MainStoreService } from './main-store.service';
import { RequestPost } from '../model/request';

export interface RequestResponse {
  message: string;
  requestId: number;
}

@Injectable({ providedIn: 'root' })
export class RequestsService {

  private http = inject(HttpClient);
  private mainStore = inject(MainStoreService);
  private apiUrl = environment.apiUrl;

  public lastRequest = signal<RequestResponse | null>(null);
  
  async createRequest(data: RequestPost): Promise<RequestPost> {
    return await firstValueFrom(this.http.post<RequestPost>(`${this.apiUrl}requests`, data));
  }
}