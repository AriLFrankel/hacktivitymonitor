import { Injectable } from '@angular/core';

declare var gapi:any;


@Injectable()
export class AuthService {

  constructor() { 
    gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
  }

  signIn(){
    gapi.auth2.getAuthInstance().signIn();
  }

  signOut() {
    gapi.auth2.getAuthInstance().signOut();
  }

  updateSigninStatus(status:boolean){
  	console.log('status', status);
  }

}
