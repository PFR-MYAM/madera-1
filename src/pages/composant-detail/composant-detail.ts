import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { ComposantProvider } from "../../providers/composant/composant";
import { GammeProvider } from '../../providers/gamme/gamme';
import { FournisseurProvider } from '../../providers/fournisseur/fournisseur';

@Component({
  selector: 'page-composant-detail',
  templateUrl: 'composant-detail.html',
})
export class ComposantDetailPage {

  allComposant: any = [];
  composant: any = {
    idComposant: 0,
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
    this.composant.idComposant = navParams.get('idComposant');
    this.getGammes();
    this.getFournisseurs();
  }

  ionViewDidLoad() {
    this.getComposant(this.composant.idComposant);
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
