import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';

/**
 * Generated class for the ClientFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-form',
  templateUrl: 'client-form.html',
})
export class ClientFormPage {

  newClient: any = {
    nomClient:'',
    prenomClient:'',
    adrRueClient:'',
    adrCpClient:'',
    adrVilleClient:'',
    telClient:'',
    emailClient:''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public clientServ: ClientProvider, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }

  createClient() {
    this.clientServ.create(this.newClient).then((res) => {
      let client: any = res;
      this.viewCtrl.dismiss(client);
    });
  }
}
