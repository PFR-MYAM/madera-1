import { Injectable } from '@angular/core';

declare function require(name:string);

let devisDatas: any = require('./devisData.json');

@Injectable()
export class DevisProvider {

  constructor() {}

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

  addNewDevis(devis) {
    devisDatas.push(devis);
  }

  deleteDevis(idDevis) {
    devisDatas.splice(idDevis, 1);
  }
}
