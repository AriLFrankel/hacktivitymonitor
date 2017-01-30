import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'hd-http',
  template: `
   <div id="loadEventsHere">Events here:</div>
   <hr>
   <button (click)="getRooms()">get Rooms</button>
   <button (click)="getEvents()">get Events</button>
  `,
  styles: [],
  providers: [HttpService]
})
export class HttpComponent {

  constructor(private httpService:HttpService) { }

  getRooms(){
    this.httpService.getRooms(["hackreactor.com_2d373931333934353637@resource.calendar.google.com", "hackreactor.com_32333137383234383439@resource.calendar.google.com", "hackreactor.com_3538363731393438383137@resource.calendar.google.com", "hackreactor.com_3136303231303936383132@resource.calendar.google.com", "hackreactor.com_3532303334313531373535@resource.calendar.google.com"]);
  }
  getEvents(){
  	this.httpService.getEvents("hackreactor.com_2d373931333934353637@resource.calendar.google.com");
  }

}
