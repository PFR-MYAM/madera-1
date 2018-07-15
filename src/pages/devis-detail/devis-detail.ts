import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import moment from 'moment';
import 'moment/locale/fr';
import _ from 'underscore';

import {DevisProvider} from "../../providers/devis/devis";
import {ComposantProvider} from "../../providers/composant/composant"

@Component({
  selector: 'page-devis-detail',
  templateUrl: 'devis-detail.html',
})
export class DevisDetailPage {
  
  allDevis: any = [];
  devis: any = {
    idDevis: 0,
    nomDevis: '',
    client: {
      nomClient: '',
      prenomClient:''
    },
    dateDevis: moment().format('YYYY-MM-DD'),
    etatDevis: 'En attente',
    prixDevis: 0
  };
  composantsDevis: any = [];
  composantList: any = [];

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public events: Events, 
    public devisService: DevisProvider, public composantService: ComposantProvider
  ) {
    this.devis.idDevis = navParams.get('idDevis');
    this.getAllComposant();
  }

  ionViewDidLoad() {
    this.getDevis(this.devis.idDevis);
  }

  getAllComposant() {
    this.composantService.getAll().then((res) => {
      this.composantList = res;
    }, (err) => {
      console.log(err);
    });
  }

  getDevis(idDevis) {
    this.devisService.getOne(idDevis).then((res) => {
      this.devis = res;
      this.getComposantDevis();
    }, (err) => {
      console.log(err);
    });
  }

  getComposantDevis() {
    _.each(this.devis.composants, function(v,k){
      this.composantsDevis.push({
        nb: k+1,
        composant: v
      });
    }, this);
  }

  addComposantInDevis(composant, item) {
    let keyItem = _.indexOf(this.composantsDevis, item);
    // Changement de la valeur dans la collection des composants du devis
    this.composantsDevis[keyItem] = {
      nb: item.nb,
      composant: {
        idComposant: composant.idComposant,
        quantite:1
      }
    };

    this.changePrice();

  }

  // changement du prix en fonction de la quantite de composant choisi et du status du changement (ajout, retrait)
  changePrice() {
    this.devis.prixDevis = 0;
    _.each(this.composantsDevis, function(v){
      let composant = _.find(this.composantList, function(c) {
        let composant = c;
        return composant.idComposant == v.composant.idComposant;
      });
      this.devis.prixDevis = this.devis.prixDevis + (composant.prixComposant * v.composant.quantite);
    }, this);
  }

  addComposant() {
    this.composantsDevis.push({
      nb: this.composantsDevis.length+1,
      composant: {
        idComposant: 0,
        quantite:0
      }
    });
  }

  deleteComposant(item){
    let devisC = _.filter(this.composantsDevis, function(v){
      let valeur = v;
      return valeur.nb > item.nb;
    });
    if(devisC.length > 0) {
      _.each(devisC, function(v) {
        let valeur = v;
        let keyItem = _.indexOf(this.composantsDevis, function(c) {
          let composant = c;
          return composant.nb === valeur.nb;
        });
        this.composantsDevis[keyItem].nb -= 1;
      }, this);
    }
    this.composantsDevis = _.without(this.composantsDevis, item);

    this.changePrice();
  }

  updateDevis() {
    this.devis.composants = [];
    _.each(this.composantsDevis, function(v) {
      let composant = v.composant;
      this.devis.composants.push(composant);
    }, this);
    this.devisService.updateDevis(this.devis);
    this.navCtrl.pop();
  }
}
