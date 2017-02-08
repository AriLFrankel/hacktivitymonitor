import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './auth-service.service';

<<<<<<< HEAD
declare var gapi: any;

=======
>>>>>>> 7c9e75e8233fa6b68b7dcba80141375544e63c96
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
