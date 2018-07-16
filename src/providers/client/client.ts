import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the ClientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientProvider {

  constructor(public http: HttpClient, public api: ApiProvider) {
  }

  getForName(name) {
    return new Promise((resolve, reject) => {
      let url = '/search/clients';
      let params = new HttpParams().set('nom',name);
      this.http.get(this.api.buildPath(url), {params: params}).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      let url = '/clients';
      this.http.get(this.api.buildPath(url), {}).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getOne(idClient) {
    return new Promise((resolve, reject) => {
      let url = '/clients/'+idClient;
      this.http.get(this.api.buildPath(url), {}).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  create(client) {
    return new Promise((resolve, reject) => {
      let url = '/clients';
      let headers = new HttpHeaders().set('Content-type','application/json');
      this.http.post(this.api.buildPath(url), JSON.stringify(client), {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  update(client) {
    return new Promise((resolve, reject) => {
      let url = '/clients';
      let headers = new HttpHeaders().set('Content-type','application/json');
      this.http.put(this.api.buildPath(url), JSON.stringify(client), {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  delete(idClient) {
    return new Promise((resolve, reject) => {
      let url = '/clients/'+idClient;
      this.http.delete(this.api.buildPath(url), {})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
