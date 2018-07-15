import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/umd';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'logoutbutton',
  templateUrl: 'logoutbutton.html'
})
export class LogoutbuttonComponent {
  constructor(public navCtrl: NavController) {
  }

  logout() {
    this.navCtrl.setRoot(LoginPage);
  }
}
