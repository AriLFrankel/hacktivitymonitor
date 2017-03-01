import { Component } from '@angular/core'
import { RoomsComponent } from './rooms.component'
import { AuthService } from '../shared/auth.service'

@Component({
  selector: 'hd-root',
  template: `
    <router-outlet></router-outlet>
  `
})

export class RootComponent {

  constructor(private authService: AuthService) {
    // TODO: find an alternative to timing out the sign in call until after async GAPI load
    setTimeout(this.signIn.bind(this), 1200)
  }

  signIn() {
    this.authService.signIn()
  }

  signOut() {
    this.authService.signOut()
  }
}
