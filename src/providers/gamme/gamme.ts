import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the GammeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GammeProvider {

  constructor(public http: HttpClient, public api: ApiProvider) {
  }


  getAll() {
    return new Promise((resolve, reject) => {
      let url = '/gammes';
      this.http.get(this.api.buildPath(url), {}).subscribe(result => {
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }

  getOne(idGamme) {
    return new Promise((resolve, reject) => {
      let url = '/gammes/'+idGamme;
      this.http.get(this.api.buildPath(url), {}).subscribe(result => {
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }
}
