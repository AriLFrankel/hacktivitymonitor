import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from "./app.routes";

import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms.component';
import { AuthPageComponent } from './auth-page.component';
import { RoomScheduleComponent } from './room-schedule.component';
import { JuniorScheduleComponent } from './junior-schedule.component';
import { SeniorScheduleComponent } from './senior-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    AuthPageComponent,
    RoomScheduleComponent,
    JuniorScheduleComponent,
    SeniorScheduleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
