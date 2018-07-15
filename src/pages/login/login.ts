import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

import { UserProvider} from "../../providers/user/user";

import { DevisListPage } from "../devis-list/devis-list";
import { ComposantsListPage } from "../composants-list/composants-list";
import { DevisListComptablePage } from "../devis-list-comptable/devis-list-comptable";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials: any = {
    login: '',
    password: ''
  };

  errorLogin: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public usrService: UserProvider,
              public toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    this.usrService.login(this.credentials).then((res) => {
      let user: any = res;
      if(user.role === "com") {
        this.navCtrl.setRoot(DevisListPage);
      } else if(user.role === "be") {
        this.navCtrl.setRoot(ComposantsListPage);  
      } else if(user.role === "compt") {
        this.navCtrl.setRoot(DevisListComptablePage);
      }      
      else {
        this.toastError('Connexion non autorisée');
        this.errorLogin = true;
      }
    }, (err) => {
      this.errorLogin = true;
      this.toastError('Identifiant ou mot de passe incorrect');
    });
  }

  toastError(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      cssClass:'error'
    });
    toast.present();
  }

}
