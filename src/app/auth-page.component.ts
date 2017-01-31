import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-service.service';

@Component({
  selector: 'hd-auth-page',
  template: `
  <div>Auth:</div>
  <button (click)="signIn()">Sign In</button>
  <button (click)="signOut()">Sign Out</button>
  <hr>
  `,
  styles: [],
  providers: [AuthService]
})
export class AuthPageComponent {

  constructor(private authService:AuthService) { }

  signIn(){
  	this.authService.signIn();
  }

  signOut(){
  	this.authService.signOut();
  }

}
