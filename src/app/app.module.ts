import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms.component';
import { AuthPageComponent } from './auth-page.component';
import { RoomScheduleComponent } from './room-schedule.component';
import { JuniorScheduleComponent } from './junior-schedule.component';
import { SeniorScheduleComponent } from './senior-schedule.component';
import { HackerspaceComponent } from './hackerspace-component.component';

import { routing } from './app.routing';
import { ApiGuard } from './api.guard';
import { HttpService } from './http.service';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    AuthPageComponent,
    RoomScheduleComponent,
    JuniorScheduleComponent,
    SeniorScheduleComponent,
    HackerspaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [HttpService, ApiGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
