import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { HttpService } from '../shared/http.service'
import { roomDictionary } from '../shared/room-dictionary'

declare const $: any

@Component({
  selector: 'hd-rooms',
  template:
  `
    <div *ngFor='let room of rooms' class="room2 row col-md-12" >
      <a class="room-name" [routerLink]='[room.summary.slice(6)]'>{{room.summary.slice(6)}}</a>
      <div class="status" id={{room.id}}
      [(style.background)]='room.busy'
      ></div>
    </div>
  `,
  providers: [HttpService]
})
export class RoomsComponent implements OnDestroy {
  rooms: any[] = []
  statusSubscription: any
  // set up a subscription to listen for service events
  constructor(private httpService: HttpService, private ref: ChangeDetectorRef) {
    this.statusSubscription = this.httpService.statusEvent
    .subscribe(roomBusy => {
      this.ref.detach()
      for (const roomBusyKey in roomBusy) {
        if (roomBusy.hasOwnProperty(roomBusyKey)) {
          for (const roomKey in this.rooms) {
            if (this.rooms.hasOwnProperty(roomKey) && this.rooms[roomKey].id === roomBusyKey) {
              this.rooms[roomKey].busy = roomBusy[roomBusyKey].color
              this.ref.detectChanges()
            }
          }
        }
      }
    })
    // get the rooms
    // get the statuses for the rooms
    // set an interval to get the statuses
    const getStatuses = this.getStatuses.bind( this)
    const getRooms = this.getRooms.bind( this)
    setTimeout(getRooms, 1200)
    setTimeout((getStatuses), 3000)
    setInterval(getStatuses, 60000)
  }

  // populate component's room's array
  // give the room a default status of green
  getRooms() {
    this.httpService.getRooms([
        roomDictionary.Ellis,
        roomDictionary.Lovelace,
        roomDictionary.Hopper,
        roomDictionary.Turing,
        roomDictionary.Dijkstra,
        roomDictionary['Lecture Hall']
      ])
    .then( (roomsArr) => {
      for (const roomKey in roomsArr) {
        if (roomsArr.hasOwnProperty(roomKey)) {
          const room = roomsArr[roomKey]
          room.busy = 'green'
          this.rooms.push(room)
        }
      }
      this.ref.detectChanges()
    })
  }
  // get the status of each room, which fires status events
  getStatuses() {
    this.rooms.forEach( (room: any) => {
      this.httpService.getStatus(room.id)
    })
  }
  // avoid memory leaks by unsubscribing on destroy
  ngOnDestroy() {
    this.statusSubscription.unsubscribe()
  }
}
