import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../model/user.model';
import {environment} from '../../../../environments/environment';
import {ObjectUserSecurityModel} from '../model/object-user-security.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  login(user: UserModel): Observable<ObjectUserSecurityModel> {
    return this.httpClient.post<ObjectUserSecurityModel>(environment.urlLocal + '/login', user);
  }

  register(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(environment.urlLocal + '/users/sign-up', user);
  }
}
