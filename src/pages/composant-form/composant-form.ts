import { Component } from '@angular/core';
import {  NavController, NavParams, Events } from 'ionic-angular';

import { ComposantProvider } from "../../providers/composant/composant";
import { GammeProvider } from '../../providers/gamme/gamme';
import { FournisseurProvider } from '../../providers/fournisseur/fournisseur';

@Component({
  selector: 'page-composant-form',
  templateUrl: 'composant-form.html',
})
export class ComposantFormPage {

  newComposant: any = {
    nomComposant: '',
    idGamme: 0,
    idFournisseur: 0,
    prixComposant: ''
  };

  gammeList: any = [];
  fournisseursList: any = [];

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public composantService: ComposantProvider, public gammeServ: GammeProvider, 
    public fournisseurServ: FournisseurProvider
  ) {
    this.getGammes();
    this.getFournisseurs();
  }

  ionViewDidLoad() {
  }

  getGammes() {
    this.gammeServ.getAll().then((res) => {
      this.gammeList = res;
    }, (err) => {
      console.log(err);
    });
  }

  getFournisseurs() {
    this.fournisseurServ.getAll().then((res) => {
      this.fournisseursList = res
    }, (err) => {
      console.log(err);
    });
  }


  addComposant() {
    this.composantService.addNewComposant(this.newComposant).then((res) => {
      let composant: any = res;
      this.events.publish('composant:added', composant);
      this.navCtrl.pop();
    });
  }

}
