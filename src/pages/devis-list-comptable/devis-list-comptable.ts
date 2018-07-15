import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { DevisDetailComptablePage } from "../devis-detail-comptable/devis-detail-comptable";

import { DevisProvider } from "../../providers/devis/devis";

@Component({
  selector: 'page-devis-list-comptable',
  templateUrl: 'devis-list-comptable.html',
})
export class DevisListComptablePage {

  allDevis: any = [];
  devisDetailComptablePage = DevisDetailComptablePage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public devisServ: DevisProvider, public events: Events) {
    this.events.subscribe('devis:added', (devis) => {
      this.allDevis.push(devis);
    });
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

}

