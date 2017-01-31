import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'hd-rooms',
  template: 
  `
    <div>Rooms here:
      <div *ngFor='let room of rooms' (click)='getEvents($event)' id={{room.id}} class="room" [style.background]='room.busy'><a [routerLink]='[room.id]'>{{room.summary}}</a></div>
    </div>
    <button (click)="getRooms()">get Rooms</button>
    <div>Events here:
      <div *ngFor='let event of events'>{{event.summary}}</div>
    </div>
  `,
  providers: [HttpService]
})
export class RoomsComponent {
  rooms: any[] = [];
  events: any[] = [];
  subscription: any;
  constructor(private httpService:HttpService) { 
    this.subscription = this.httpService.statusEvent
    .subscribe(roomBusy => {
      for(let roomBusyKey in roomBusy){
        console.log(roomBusyKey)
        for(let roomKey in this.rooms){
          console.log(this.rooms[roomKey].id)
          if(this.rooms[roomKey].id === roomBusyKey) this.rooms[roomKey].busy = roomBusy[roomBusyKey];
        }
      }
      console.log(this.rooms)
    })
  }

  getRooms(){
    this.httpService.getRooms(["hackreactor.com_2d373931333934353637@resource.calendar.google.com", "hackreactor.com_32333137383234383439@resource.calendar.google.com", "hackreactor.com_3538363731393438383137@resource.calendar.google.com", "hackreactor.com_3136303231303936383132@resource.calendar.google.com", "hackreactor.com_3532303334313531373535@resource.calendar.google.com"])
    .then( (roomsObj) => {
      this.rooms = [];
      this.events = [];
      for(let roomKey in roomsObj){
        let room = roomsObj[roomKey];
        this.rooms.push(room);
      }
      this.rooms.map( (room:any) => {
        console.log(room);
        return this.httpService.getStatus(room.id)
      })
    });  
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
