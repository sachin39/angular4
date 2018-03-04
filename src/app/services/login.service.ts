import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { User } from '../user';
@Injectable()
export class LoginService {

  user: User;
  constructor(private http: HttpClient) {}
  getLoginDetails(user) {
    return this.http
      .post(`http://localhost:9090/springrestfulmavenized/login`, user)
      .catch(this.errorHandler);
  }
  errorHandler(error: Response) {
    return Observable.throw(error || 'Server Error');
  }

}
