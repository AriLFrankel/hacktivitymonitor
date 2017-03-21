import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { routing } from './app.routing'

import { RootComponent } from './components/root.component'
import { RoomsComponent } from './components/rooms.component'
import { RoomScheduleComponent } from './components/room-schedule.component'
import { JuniorSeniorComponent } from './components/junior-senior.component'
import { AppComponent } from './components/app.component'
import { GooeyNavComponent } from './components/gooey-nav.component'
import { WeatherComponent } from './components/weather.component'
import { ClockComponent } from './components/clock.component'
import { CheckmarkComponent } from './components/checkmark.component'
import { JuniorSeniorDisplayComponent } from './components/junior-senior-display.component'
import { HttpService } from './shared/http.service'
import { AuthService } from './shared/auth.service'

@NgModule({
  declarations: [
    RootComponent,
    RoomsComponent,
    RoomScheduleComponent,
    JuniorSeniorComponent,
    JuniorSeniorDisplayComponent,
    AppComponent,
    WeatherComponent,
    ClockComponent,
    GooeyNavComponent,
    CheckmarkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [HttpService, AuthService],
  bootstrap: [RootComponent]
})
export class AppModule { }
