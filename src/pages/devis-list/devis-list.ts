import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { DevisFormPage } from "../devis-form/devis-form";
import { DevisDetailPage } from "../devis-detail/devis-detail";

import { DevisProvider } from "../../providers/devis/devis";

@Component({
  selector: 'page-devis-list',
  templateUrl: 'devis-list.html',
})
export class DevisListPage {
  allDevis: any = [];
  devisFormPage = DevisFormPage;
  devisDetailPage = DevisDetailPage;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public devisServ: DevisProvider, 
    public events: Events
  ) {
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

  deleteDevis(idDevis) {
    idDevis = idDevis-1;
    this.devisServ.deleteDevis(idDevis);
  }
}
