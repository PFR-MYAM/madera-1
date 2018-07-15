import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiProvider } from '../api/api';

@Injectable()
export class ComposantProvider {

  constructor(public httpClient: HttpClient, public api: ApiProvider) {
  }

  getAll() {
    return new Promise((resolve, reject) =>{
      let url = '/composants';
      this.httpClient.get(this.api.buildPath(url), {}).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getOne(idComposant) {
    return new Promise((resolve, reject) => {
      let url = '/composants/'+idComposant;
      this.httpClient.get(this.api.buildPath(url), {}).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  addNewComposant(composant) {
    return new Promise((resolve, reject) => {
      let url = '/composants';
      let headers = new HttpHeaders().set('Content-type','application/json');
      this.httpClient.post(this.api.buildPath(url), JSON.stringify(composant), {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteComposant(idComposant) {
    return new Promise((resolve, reject) => {
      let url = '/composants/'+idComposant;
      this.httpClient.delete(this.api.buildPath(url), {}).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  updateComposant(composant) {
    return new Promise((resolve, reject) => {
      let url = '/composants';
      let headers = new HttpHeaders().set('Content-type','application/json');
      this.httpClient.put(this.api.buildPath(url), JSON.stringify(composant), {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
