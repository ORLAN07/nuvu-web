import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {CityModel} from '../model/city-model';
import {shareReplay, switchMap, takeUntil, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  refreshInterval = 40000;
  cacheSize = 1;
  url = 'http://localhost:9090/cities';
  private cache$: Observable<CityModel[]>;

  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<CityModel[]> {
    /*console.log('cache>>', this.cache$);
    if (!this.cache$) {
      console.log('entra>>', this.cache$);
      const timer$ = timer(0, this.refreshInterval);
      this.cache$ = timer$.pipe(switchMap(() => this.forceReload()));
    }
    return this.cache$;*/
    return this.httpClient.get<CityModel[]>(this.url);
  }

  getByCountry(codeCountry: string): Observable<CityModel[]> {
    return this.httpClient.get<CityModel[]>(this.url + '/country/' + codeCountry);
  }

  forceReload(): Observable<CityModel[]> {
    console.log('fuerza reload');
    return this.httpClient.get<CityModel[]>(this.url);
  }
}
