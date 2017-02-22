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
    setTimeout(this.signIn.bind(this), 1200)
  }

  signIn() {
    this.authService.signIn()
  }

  signOut() {
    this.authService.signOut()
  }
}
