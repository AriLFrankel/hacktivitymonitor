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
    const getStatuses = this.getStatuses.bind( this)
    const getRooms = this.getRooms.bind( this)
    setTimeout(getRooms, 1200)
    setTimeout((getStatuses), 3000)
    setInterval(getStatuses, 60000)
  }

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
          this.rooms.push(room)
        }
      }
      this.ref.detectChanges()
    })
  }

  getStatuses() {
    this.rooms.forEach( (room: any) => {
      this.httpService.getStatus(room.id)
    })
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe()
  }
}
