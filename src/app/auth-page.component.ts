import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-service.service';

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
export class AuthPageComponent {

  constructor(private authService:AuthService){ 
    this.signIn();
  }

  signIn(){
  	this.authService.signIn();
  }

  signOut(){
  	this.authService.signOut();
  }

  ngOnDestroy(){
    this.signOut()
  }
}
