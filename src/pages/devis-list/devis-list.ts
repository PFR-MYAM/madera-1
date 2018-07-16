import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { DevisFormPage } from "../devis-form/devis-form";
import { DevisDetailPage } from "../devis-detail/devis-detail";

import { DevisProvider } from "../../providers/devis/devis";
import { ClientProvider } from '../../providers/client/client';

import _ from 'underscore';

@Component({
  selector: 'page-devis-list',
  templateUrl: 'devis-list.html',
})
export class DevisListPage {
  allDevis: any = [];
  devisFormPage = DevisFormPage;
  devisDetailPage = DevisDetailPage;
  clientsList: any = [];

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public devisServ: DevisProvider, 
    public events: Events, public clientServ: ClientProvider
  ) {
    this.events.subscribe('devis:added', (devis) => {
      this.allDevis.push(devis);
    });

    this.getClients();
  }

  ionViewDidLoad() {
    this.getAll();
  }

  getAll() {
    this.devisServ.getAll().then((res) => {
      this.allDevis = res;
    }, (err) => {
      console.log(err);
    });
  }

  getClients() {
    this.clientServ.getAll().then((res) => {
      this.clientsList = res;
    }, (err) => {
      console.log(err);
    });
  }

  getClientDevis(idClient){
    let client: any = _.find(this.clientsList, function(c) {
      let client: any = c;
      return client.idClient === idClient;
    });

    return client.nomClient+' '+client.prenomClient
  }

  deleteDevis(idDevis) {
    idDevis = idDevis-1;
    this.devisServ.deleteDevis(idDevis);
  }
}
