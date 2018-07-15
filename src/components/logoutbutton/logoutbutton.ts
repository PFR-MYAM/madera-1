import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'logoutbutton',
  templateUrl: 'logoutbutton.html'
})
export class LogoutbuttonComponent {
  constructor(private userServ: UserProvider) {
  }

  logout() {
    this.userServ.logout();
  }
}
