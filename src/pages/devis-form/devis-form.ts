import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import moment from 'moment';
import 'moment/locale/fr';
import {DevisProvider} from "../../providers/devis/devis";
//import {ComposantProvider} from "../../providers/composant/composant"

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

  composantList: any = [
    {
      nomComposant: "Toiture ardoise",
      prixComposant: 3000
    },
    {
      nomComposant: "Toiture bois chêne",
      prixComposant: 3500
    },
    {
      nomComposant: "Toiture bois hêtre",
      prixComposant: 4000
    },
    {
      nomComposant: 'Mur exterieur bois chêne',
      prixComposant: 2500
    },
    {
      nomComposant: "Mur bois exterieur hêtre",
      prixComposant: 3000
    },
    {
      nomComposant: "Mur interieur bois chêne",
      prixComposant: 2350
    },
    {
      nomComposant: "Escalier bois chêne",
      prixComposant: 1500
    },
    {
      nomComposant: "Escalier bois hêtre",
      prixComposant: 2350
    },
    {
      nomComposant: "Lisses bas bois chêne",
      prixComposant: 2350
    },
    {
      nomComposant: "Lisse haut bois chêne",
      prixComposant: 2350
    },
    {
      nomComposant: "Lisses bas bois hêtre",
      prixComposant: 2350
    },
    {
      nomComposant: "Lisse haut bois hêtre",
      prixComposant: 2350
    },
    {
      nomComposant: "Montant verticaux bois chêne",
      prixComposant: 2350
    },
    {
      nomComposant: "Montant verticaux bois chêne",
      prixComposant: 2350
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public devisService: DevisProvider) {
    this.newDevis.idDevis = navParams.get('idDevis');
  }

  ionViewDidLoad() {
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
