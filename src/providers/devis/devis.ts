import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
declare function require(name:string);

let devisDatas: any = require('./devisData.json');

@Injectable()
export class DevisProvider {

  constructor(public httpClient: HttpClient) {}

  getAll() {
    return new Promise((resolve, reject) =>{
      if(devisDatas && (typeof devisDatas != 'undefined')) {
        if (devisDatas.length > 0) {
          resolve(devisDatas);
        } else {
          reject({status:204, message:'No content'});
        }
      } else {
        reject({status:500, message:'Error server'});
      }
    });
  }

  getOne(idDevis) {
    return new Promise((resolve, reject) => {
      resolve(devisDatas.find(item => item.idDevis === idDevis));
      // A utiliser avec une api
      /**
       * let url = '';
       * this.httpClient.get(url, {}).subscribe(res => {
       *  resolve(res);
       * }, (err) => {
       *  reject(err);
       * })
       */
    });
  }

  addNewDevis(devis) {
    devisDatas.push(devis);
    /**
     * 
     */
  }

  deleteDevis(idDevis) {
    devisDatas.splice(idDevis, 1);
  }

  updateDevis(composant) {
    /*devisDatas[composant.idComposant-1].nomComposant = composant.nomComposant;
    devisDatas[composant.idComposant-1].gammeComposant = composant.gammeComposant;
    devisDatas[composant.idComposant-1].fournisseurComposant = composant.fournisseurComposant;
    devisDatas[composant.idComposant-1].prixComposant = composant.prixComposant;*/
    console.log(composant);
  }
}
