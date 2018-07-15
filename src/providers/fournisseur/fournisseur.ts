import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

@Injectable()
export class FournisseurProvider {

  constructor(public http: HttpClient, public api: ApiProvider) {
    console.log('Hello FournisseurProvider Provider');
  }

  getAll() {
    return new Promise((resolve, reject) => {
      let url = '/fournisseurs';
      this.http.get(this.api.buildPath(url), {}).subscribe(result => {
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }

  getOne(idFournisseur) {
    return new Promise((resolve, reject) => {
      let url = '/fournisseurs/'+idFournisseur;
      this.http.get(this.api.buildPath(url), {}).subscribe(result => {
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }

  create(fournisseur) {
    return new Promise((resolve, reject) => {
      let url = '/fournisseurs';
      let headers = new HttpHeaders().set('Content-type','application/json');

      this.http.post(this.api.buildPath(url), JSON.stringify(fournisseur), {headers: headers}).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  

}
