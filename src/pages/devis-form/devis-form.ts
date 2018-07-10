import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import moment from 'moment';
import 'moment/locale/fr';
import {DevisProvider} from "../../providers/devis/devis";
import {ComposantProvider} from "../../providers/composant/composant"

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

  nbComposants: any = [{nb:1}];
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

  addComposant() {
    this.nbComposants.push({nb:this.nbComposants.length+1});
  }

  addPrice(prix){
    this.newDevis.prixDevis += prix;
  }

  addDevis() {
    this.devisService.addNewDevis(this.newDevis);
    this.navCtrl.pop();
    //this.events.publish('devis:added', this.newDevis);
  }
}
