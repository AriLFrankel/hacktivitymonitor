import { Component, OnDestroy } from '@angular/core'
import { AuthService } from './auth-service.service'

declare var gapi: any

@Component({
  selector: 'hd-auth-page',
  template: ``,
  styles: [],
  providers: [AuthService]
})
export class AuthPageComponent implements OnDestroy {

  constructor(private authService: AuthService) {
    setTimeout(this.signIn.bind(this), 1200)
  }

  signIn() {
    this.authService.signIn()
  }

  signOut() {
    this.authService.signOut()
  }

  ngOnDestroy() {
    this.signOut()
  }
}
