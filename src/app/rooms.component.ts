import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'hd-rooms',
  template:
  `
    <div *ngFor='let room of rooms'
    id={{room.id}} class="room"
    [style.background]='room.busy'>
    <a [routerLink]='[room.summary.slice(6)]'>{{room.summary.slice(6)}}</a>
    </div>
  `,
  providers: [HttpService]
})
export class RoomsComponent implements OnDestroy {
  rooms: any[] = [];
  events: any[] = [];
  subscription: any;
  constructor(private httpService: HttpService, private ref: ChangeDetectorRef) {
    ref.detach();
    this.subscription = this.httpService.statusEvent
    .subscribe(roomBusy => {
      for (const roomBusyKey in roomBusy) {
        if (roomBusy.hasOwnProperty(roomBusyKey)) {
          for (const roomKey in this.rooms) {
            if (this.rooms.hasOwnProperty(roomKey) && this.rooms[roomKey].id === roomBusyKey) {
              this.rooms[roomKey].busy = roomBusy[roomBusyKey];
            }
          }
        }
      }
      this.ref.detectChanges();
    });
    const getRooms = this.getRooms.bind( this);
    const getStatuses = this.getStatuses.bind( this);
    setTimeout(getRooms, 1000);
    setTimeout(getStatuses, 1500);
  }

  getRooms() {
    this.httpService.getRooms(
      ['hackreactor.com_2d373931333934353637@resource.calendar.google.com',
      'hackreactor.com_32333137383234383439@resource.calendar.google.com',
      'hackreactor.com_3538363731393438383137@resource.calendar.google.com',
      'hackreactor.com_3136303231303936383132@resource.calendar.google.com',
      'hackreactor.com_3532303334313531373535@resource.calendar.google.com'
      ])
    .then( (roomsObj) => {
      this.rooms = [];
      this.events = [];
      for (const roomKey in roomsObj) {
        if (roomsObj.hasOwnProperty(roomKey)) {
          const room = roomsObj[roomKey];
          this.rooms.push(room);
        }
      };
    });
  };

  getStatuses() {
    this.rooms.map( (room: any) => {
      return this.httpService.getStatus(room.id);
    });
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };
};
