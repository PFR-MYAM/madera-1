import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

declare function require(name:string);

let composantData: any = require('./composantData.json');

@Injectable()
export class ComposantProvider {

  constructor(public httpClient: HttpClient) {
  }

  getAll() {
    return new Promise((resolve, reject) =>{
      if(composantData && (typeof composantData != 'undefined')) {
        if (composantData.length > 0) {
          resolve(composantData);
        } else {
          reject({status:204, message:'No content'});
        }
      } else {
        reject({status:500, message:'Error server'});
      }
      /**
       * let url = '';
       * this.httpClient.get(url, {}).subscribe(res => {
       *  resolve(res);
       * }, (err) => {
       *  reject(err);
       * });
       */
    });
  }

  getOne(idComposant) {
    return new Promise((resolve, reject) => {
      resolve(composantData.find(item => item.idComposant === idComposant));
    });
    /**
     * let url = '';
     * let params = HttpParams()
     *  .set('idComposant', idComposant);
     * this.httpClient.get(url, {params: params}).subscribe(res => {
     *  resolve(res);
     * }, (err) => {
     *  reject(err);
     * });
     */
  }

  addNewComposant(composant) {
    composantData.push(composant);
    /**
     * let url = '';
     * this.httpClient.post(url, JSON.stringify(composant), {}).subscribe(res => {
     *  resolve(res);
     * }, (err) => {
     *  reject(err);
     * });
     */
  }

  deleteComposant(idComposant) {
    composantData.splice(idComposant, 1);
    /**
     * let url = '';
     * let param = HttpParams().set('idComposant', idComposant);
     * this.httpClient.delete(url, {params:params}).subscribe(res => {
     *  resolve(res);
     * }, (err) => {
     *  reject(err);
     * });
     */

  }

  updateComposant(composant) {
    composantData[composant.idComposant-1].nomComposant = composant.nomComposant;
    composantData[composant.idComposant-1].gammeComposant = composant.gammeComposant;
    composantData[composant.idComposant-1].fournisseurComposant = composant.fournisseurComposant;
    composantData[composant.idComposant-1].prixComposant = composant.prixComposant;
    
    /**
     * let url = '';
     * this.httpClient.put(url, JSON.stringify(composant), {}).subscribe(res => {
     *  resolve(res);
     * }, (err) => {
     *  reject(err);
     * });
     */

  }
}
