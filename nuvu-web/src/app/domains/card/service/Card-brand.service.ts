import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CardBrandModel} from '../model/card-brand.model';
import {environment} from '../../../../environments/environment';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CardBrandService {

  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<CardBrandModel[]> {
    return this.httpClient.get<CardBrandModel[]>(environment.urlLocal + '/card-brands');
  }
}
