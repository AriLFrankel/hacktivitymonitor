import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { HttpService } from './http.service'
import { roomDictionary } from './room-dictionary'

declare const $: any

@Component({
  selector: 'hd-rooms',
  template:
  `
    <div class="room2 row col-md-12" *ngFor='let room of rooms'>
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
  events: any[] = []
  subscription: any
  constructor(private httpService: HttpService, private ref: ChangeDetectorRef) {
    ref.detach()
    this.subscription = this.httpService.statusEvent
    .subscribe(roomBusy => {
      for (const roomBusyKey in roomBusy) {
        if (roomBusy.hasOwnProperty(roomBusyKey)) {
          for (const roomKey in this.rooms) {
            if (this.rooms.hasOwnProperty(roomKey) && this.rooms[roomKey].id === roomBusyKey) {
              this.rooms[roomKey].busy = roomBusy[roomBusyKey]
              this.ref.detectChanges()
            }
          }
        }
      }
    })
    const getRooms = this.getRooms.bind( this)
    const getStatuses = this.getStatuses.bind( this)
    setTimeout(getRooms, 1200)
    setTimeout(getStatuses, 2400)
    setInterval(getStatuses, 60000)
  }

  getRooms() {
    this.httpService.getRooms(
      [
        roomDictionary.Hamilton,
        roomDictionary.Ellis,
        roomDictionary.Lovelace,
        roomDictionary.Hopper,
        roomDictionary.Turing,
        roomDictionary.Djikstra
      ])
    .then( (roomsObj) => {
      this.rooms = []
      this.events = []
      for (const roomKey in roomsObj) {
        if (roomsObj.hasOwnProperty(roomKey)) {
          const room = roomsObj[roomKey]
          room.busy = 'green'
          this.rooms.push(room)
        }
      }
    })
  }

  getStatuses() {
    this.rooms.forEach( (room: any) => {
      this.httpService.getStatus(room.id)
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
