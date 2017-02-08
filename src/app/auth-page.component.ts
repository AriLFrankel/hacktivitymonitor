import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './auth-service.service';

declare var gapi: any;

@Component({
  selector: 'hd-auth-page',
  template: `
  <div style="display:none">Auth:
  <br>
  <button (click)="signIn()">Sign In</button>
  <button (click)="signOut()">Sign Out</button>
  <hr>
  </div>
  `,
  styles: [],
  providers: [AuthService]
})
export class AuthPageComponent implements OnDestroy {

  constructor(private authService: AuthService) {
    console.log('gapi in constructor: ', gapi)
    setTimeout(this.signIn.bind(this), 1200);
  }

  signIn() {
    this.authService.signIn();
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.signOut();
  }
}
