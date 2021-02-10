import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CardLevelModel} from '../model/card-level.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardLevelService {

  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<CardLevelModel[]> {
    return this.httpClient.get<CardLevelModel[]>(environment.urlLocal + '/card-levels');
  }
}
