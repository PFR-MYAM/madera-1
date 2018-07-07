import { Injectable } from '@angular/core';

import _ from 'underscore';

declare function require(name:string);

let usersData = require('./userModel.json');

@Injectable()
export class UserProvider {

  constructor() {}

  login(credentials) {
    return new Promise((resolve, reject) => {

      let user: any = _.find(usersData, function (u) {
        let usr: any = u;
        return usr.login === credentials.login;
      });

      if(user && (typeof user != 'undefined')) {
        if(user.password === credentials.password){
          resolve(user);
        } else {
          reject({status:401, message: 'Unauthorize'});
        }
      } else {
        reject({status:401, message: 'Unauthorize'});
      }
    })
  }
}
