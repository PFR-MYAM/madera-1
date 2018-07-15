import { Component } from '@angular/core';
import { NavController, NavParams, Events, ModalController } from 'ionic-angular';

import moment from 'moment';
import 'moment/locale/fr';
import _ from 'underscore';

import {DevisProvider} from "../../providers/devis/devis";
import {ComposantProvider} from "../../providers/composant/composant"
import { ClientProvider } from '../../providers/client/client';
import { ClientFormPage } from '../client-form/client-form';

@Component({
  selector: 'page-devis-detail',
  templateUrl: 'devis-detail.html',
})
export class DevisDetailPage {
  
  allDevis: any = [];
  devis: any = {
    idDevis: 0,
    nomDevis: '',
    idClient: 0,
    dateDevis: moment().format('YYYY-MM-DD'),
    etatDevis: 'En attente',
    prixDevis: 0
  };
  composantsDevis: any = [];
  composantList: any = [];

  listSearchClient: any = [];
  client: any = {};

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public events: Events, 
    public devisService: DevisProvider, public composantService: ComposantProvider,
    public clientServ: ClientProvider, public modalCtrl: ModalController
  ) {
    this.devis.idDevis = navParams.get('idDevis');
    this.getAllComposant();
  }

  ionViewDidLoad() {
    this.getDevis(this.devis.idDevis);
  }

  getExistClient(ev: any) {
    this.clientServ.getForName(this.client.nomClient).then((res) => {
      this.listSearchClient = res;
    }, (err) => {
      console.log(err);
    });
  }

  selectClient(c) {
    this.listSearchClient = [];
    this.client = c;
  }

  createNewClient() {
    let modal = this.modalCtrl.create(ClientFormPage);

    modal.onDidDismiss(data => {
      this.client = data;
    });
 
    modal.present();
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
      this.getClient();
    }, (err) => {
      console.log(err);
    });
  }

  getClient() {
    this.clientServ.getOne(this.devis.idClient).then((res) => {
      this.client = res;
    }, (err) => {
      console.log(err);
    })
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
    this.devis.idClient = this.client.idClient;
    this.devisService.updateDevis(this.devis);
    this.navCtrl.pop();
  }
}
