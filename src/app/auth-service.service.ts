import { Injectable } from '@angular/core';

declare var gapi: any;


@Injectable()
export class AuthService {
  signIn() {
    gapi.auth2.getAuthInstance().signIn
  }

  signOut() {
    gapi.auth2.getAuthInstance().signOut
  }
}
