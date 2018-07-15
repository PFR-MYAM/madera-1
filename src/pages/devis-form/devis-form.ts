import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import moment from 'moment';
import 'moment/locale/fr';
import {DevisProvider} from "../../providers/devis/devis";
import {ComposantProvider} from "../../providers/composant/composant";
import _ from 'underscore';

@Component({
  selector: 'page-devis-form',
  templateUrl: 'devis-form.html',
})
export class DevisFormPage {
  
  newDevis: any = {
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

  nbComposants: any = [{nb:1, composant:{idComposant: 0, quantite:0}}];
  // composantList : any = []
  // comosantList= ComposantProvider.getAll()

  composantList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public devisService: DevisProvider, public composantService: ComposantProvider) {
    this.newDevis.idDevis = navParams.get('idDevis');
  }

  ionViewDidLoad() {
    this.getAllComposant();
  }

  getAllComposant() {
    this.composantService.getAll().then((res) => {
      this.composantList = res;
    }, (err) => {
      console.log(err);
    });
  }

  addComposantInDevis(composant, item) {
    let keyItem = _.indexOf(this.nbComposants, item);
    // Changement de la valeur dans la collection des composants du devis
    this.nbComposants[keyItem] = {
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
    this.newDevis.prixDevis = 0;
    _.each(this.nbComposants, function(v){
      let composant = _.find(this.composantList, function(c) {
        let composant = c;
        return composant.idComposant == v.composant.idComposant;
      });
      this.newDevis.prixDevis = this.newDevis.prixDevis + (composant.prixComposant * v.composant.quantite);
    }, this);
  }

  addComposant() {
    this.nbComposants.push({
      nb: this.nbComposants.length+1,
      composant: {
        idComposant: 0,
        quantite:0
      }
    });
  }

  deleteComposant(item){
    let devisC = _.filter(this.nbComposants, function(v){
      let valeur = v;
      return valeur.nb > item.nb;
    });
    if(devisC.length > 0) {
      _.each(devisC, function(v) {
        let valeur = v;
        let keyItem = _.indexOf(this.nbComposants, function(c) {
          let composant = c;
          return composant.nb === valeur.nb;
        });
        this.nbComposants[keyItem].nb -= 1;
      }, this);
    }
    this.nbComposants = _.without(this.nbComposants, item);

    this.changePrice();
  }

  addDevis() {
    this.newDevis.composants = [];
    _.each(this.nbComposants, function(v) {
      let composant = v.composant;
      this.newDevis.composants.push(composant);
    }, this);

    this.devisService.addNewDevis(this.newDevis);
    this.navCtrl.pop();
    //this.events.publish('devis:added', this.newDevis);
  }
}
