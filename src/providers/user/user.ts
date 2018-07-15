import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiProvider } from '../api/api';

@Injectable()
export class UserProvider {

  constructor(public http: HttpClient, public api: ApiProvider) {}

  login(credentials) {
    return new Promise((resolve, reject) => {
      let url = '/login';
      let headers = new HttpHeaders().set('Content-type','application/json');
      this.http.post(this.api.buildPath(url), JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
