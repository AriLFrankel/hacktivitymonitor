import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'hd-rooms',
  template: 
  `
    <div>Rooms here:
      <div *ngFor='let room of rooms' (click)='getEvents($event)' id={{room.id}} class="room">{{room.summary}}</div>
    </div>
    <button (click)="getRooms()" (statusEvent)="updateStatus($event)">get Rooms</button>
    <div>Events here:
      <div *ngFor='let event of events'>{{event.summary}}</div>
    </div>
  `,
  providers: [HttpService]
})
export class RoomsComponent {
  rooms: any[] = [];
  events: any[] = [];
  
  constructor(private httpService:HttpService) { }

  getRooms(){
    this.httpService.getRooms(["hackreactor.com_2d373931333934353637@resource.calendar.google.com", "hackreactor.com_32333137383234383439@resource.calendar.google.com", "hackreactor.com_3538363731393438383137@resource.calendar.google.com", "hackreactor.com_3136303231303936383132@resource.calendar.google.com", "hackreactor.com_3532303334313531373535@resource.calendar.google.com"])
    .then( (roomsObj) => {
      this.rooms = [];
      this.events = [];
      for(let roomKey in roomsObj){
        let room = roomsObj[roomKey];
        this.rooms.push(room);
      }
      Promise.all(this.rooms.map( (room:any) => {
        console.log(room);
        return this.httpService.getStatus(room.id)
      })).then(roomsData => console.log(roomsData));
    })  
  }

  getEvents(room:any){
    // get events for a room
    // room is either a roomId or a dom element with id attribute of roomId
  	return this.httpService.getEvents(room.target.id || room)
    .then ( (events) => {
      if(events.length) this.events = [].concat(events);
      else this.events = [{summary: 'no events in calendar'}]
    })
  }

  updateStatus(event:any){
    console.log('updateStatus event', event);
  }
}
