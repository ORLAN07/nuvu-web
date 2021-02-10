import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CountryModel} from '../model/country-model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<CountryModel[]> {
    return this.httpClient.get<CountryModel[]>(environment.urlLocal + '/countries');
  }

}
