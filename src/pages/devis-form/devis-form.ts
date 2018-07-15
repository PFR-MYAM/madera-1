import { Component } from '@angular/core';
import { NavController, NavParams, Events, ModalController } from 'ionic-angular';

import moment from 'moment';
import 'moment/locale/fr';
import {DevisProvider} from "../../providers/devis/devis";
import {ComposantProvider} from "../../providers/composant/composant";
import _ from 'underscore';
import { ClientProvider } from '../../providers/client/client';
import { ClientFormPage } from '../client-form/client-form';

@Component({
  selector: 'page-devis-form',
  templateUrl: 'devis-form.html',
})
export class DevisFormPage {
  
  newDevis: any = {
    idDevis: 0,
    nomDevis: '',
    idClient: 0,
    dateDevis: moment().format('YYYY-MM-DD'),
    etatDevis: 'En attente',
    prixDevis: 0
  };

  client: any = {
    idClient: 0,
    nomClient:'',
    prenomClient:'',
    adrRueClient:'',
    adrCpClient:'',
    adrVilleClient:'',
    telClient:'',
    emailClient:''
  };

  listSearchClient: any = [];

  nbComposants: any = [{nb:1, composant:{idComposant: 0, quantite:0}}];
  // composantList : any = []
  // comosantList= ComposantProvider.getAll()

  composantList: any = [];

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public events: Events, 
    public devisService: DevisProvider, public composantService: ComposantProvider,
    public clientServ: ClientProvider, public modalCtrl: ModalController
  ) {
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

    this.newDevis.idClient = this.client.idClient;

    this.devisService.addNewDevis(this.newDevis).then((res)=>{
      this.events.publish('devis:added', this.newDevis);
      this.navCtrl.pop();
    }, (err) => {
      console.log(err);
    });
    //
  }
}
