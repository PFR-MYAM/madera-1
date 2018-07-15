import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'logout-button',
  templateUrl: 'logout-button.html'
})
export class LogoutButton {
  constructor(public navCtrl: NavController) {
  }

  logout() {
    this.navCtrl.setRoot(LoginPage);
  }
}
