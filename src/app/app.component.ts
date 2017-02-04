import { Component } from '@angular/core';
import { RoomsComponent } from './rooms.component';

@Component({
  selector: 'hd-root',
  template: `
    <router-outlet></router-outlet>
  `
})

export class AppComponent {
}
