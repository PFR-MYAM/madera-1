import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {
  local: string = 'localhost';
  server: string = '';

  api = this.local;
  constructor() {
  }

  buildPath(url) {
    return this.api + url;
  }
}
