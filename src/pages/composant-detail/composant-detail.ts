import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { ComposantProvider } from "../../providers/composant/composant";

@Component({
  selector: 'page-composant-detail',
  templateUrl: 'composant-detail.html',
})
export class ComposantDetailPage {

  allComposant: any = [];
  composant: any = {
    idComposant: 0,
    nomComposant: '',
    gammeComposant: '',
    fournisseurComposant: '',
    prixComposant: ''
  };
  gammeList = ['basse','moyenne','haute'];


  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public composantService: ComposantProvider) {
    this.composant.idComposant = navParams.get('idComposant');
  }

  ionViewDidLoad() {
    this.getComposant(this.composant.idComposant);
  }

  getComposant(idComposant) {
    this.composantService.getOne(idComposant).then((res) => {
      this.composant = res;
    }, (err) => {
      console.log(err);
    });
  }

  updateComposant() {
    this.composantService.updateComposant(this.composant);
    this.navCtrl.pop();
  }
}
