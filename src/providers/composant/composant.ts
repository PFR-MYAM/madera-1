import { Injectable } from '@angular/core';

declare function require(name:string);

let composantData: any = require('./composantData.json');

@Injectable()
export class ComposantProvider {

  constructor() {
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
    });
  }

  getOne(idComposant) {
    return new Promise((resolve, reject) => {
      resolve(composantData.find(item => item.idComposant === idComposant));
    });
  }

  addNewComposant(composant) {
    composantData.push(composant);
  }

  deleteComposant(idComposant) {
    composantData.splice(idComposant, 1);
  }

  updateComposant(composant) {
    composantData[composant.idComposant-1].nomComposant = composant.nomComposant;
    composantData[composant.idComposant-1].gammeComposant = composant.gammeComposant;
    composantData[composant.idComposant-1].fournisseurComposant = composant.fournisseurComposant;
    composantData[composant.idComposant-1].prixComposant = composant.prixComposant;
  }
}
