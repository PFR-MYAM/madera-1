import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiProvider } from '../api/api';

@Injectable()
export class DevisProvider {

  constructor(public httpClient: HttpClient, public api: ApiProvider) {}

  getAll() {
    return new Promise((resolve, reject) =>{
      let url = '/devis';
      this.httpClient.get(this.api.buildPath(url), {}).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getOne(idDevis) {
    return new Promise((resolve, reject) => {
      let url = '/devis/'+idDevis;
      this.httpClient.get(this.api.buildPath(url), {}).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  addNewDevis(devis) {
    return new Promise((resolve, reject)=> {
      let url = '/devis';
      let headers = new HttpHeaders().set('Content-type','application/json');
      this.httpClient.post(this.api.buildPath(url), JSON.stringify(devis), {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteDevis(idDevis) {
    return new Promise((resolve, reject) => {
      let url = '/devis/'+idDevis;
      this.httpClient.delete(this.api.buildPath(url), {}).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  
  updateDevis(devis) {
    return new Promise((resolve, reject) => {
      let url = '/devis';
      let headers = new HttpHeaders().set('Content-type','application/json');
      this.httpClient.put(this.api.buildPath(url), JSON.stringify(devis), {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
