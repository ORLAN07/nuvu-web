import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientModel} from '../model/client.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = 'http://localhost:9090/client';

  constructor(private httpClient: HttpClient) {
  }

  get(idClient: number): Observable<ClientModel> {
    return this.httpClient.get<ClientModel>(this.url + '/' + idClient);
  }

  create(client: ClientModel): Observable<ClientModel> {
    return this.httpClient.post<ClientModel>(this.url, client);
  }

  delete(idClient: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.url + '/' + idClient);
  }
}
