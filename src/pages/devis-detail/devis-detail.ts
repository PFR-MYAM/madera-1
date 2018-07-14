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
    let oldComposant = _.find(this.composantList, function(c) {
      let composant = c;
      return item.composant.idComposant === composant.idComposant;
    });
    //changement du prix retrait du prix de l'ancien composant x sa quantite
    this.devis.prixDevis = this.devis.prixDevis - (oldComposant.prixComposant * item.composant.quantite);
    // Changement de la valeur dans la collection des composants du devis
    this.composantsDevis[keyItem] = {
      nb: item.nb,
      composant: {
        idComposant: composant.idComposant,
        quantite:1
      }
    };

    this.addPrice(composant.idComposant, 1);
  }

  addPrice(idComposant, quantite) {
    let composant = _.find(this.composantList, function(c) {
      let comp = c;
      return idComposant === comp.idComposant;
    });

    //si la quantite est différente de 1 alors on lui retire 1 pour ne pas compter le prix ajouter au choix du composant
    quantite = (quantite != 1 ? quantite-1: quantite);

    this.devis.prixDevis = this.devis.prixDevis + (composant.prixComposant * quantite);
  }

  updateDevis() {
    this.devisService.updateDevis(this.devis);
    this.navCtrl.pop();
  }
}
