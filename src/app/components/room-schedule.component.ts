import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpService } from '../shared/http.service'
import { AuthService } from '../shared/auth.service'
import { roomDictionary } from '../shared/room-dictionary'

@Component({
  selector: 'hd-room-schedule',
  template: `
  <div [style.background]="roomStatus">
    <div class="room-title">{{ roomName }}</div>
    <hd-gooey-nav></hd-gooey-nav>
    <div>
      <span *ngIf="roomStatus === 'red' || roomStatus === 'yellow'">Next available at</span>
      <span *ngIf="roomStatus === 'green'">Available until</span>
      {{ statusChangeTime }}
    </div>
  </div>
  `,
  providers: [HttpService, AuthService]
})

export class RoomScheduleComponent implements OnDestroy {
  private routeSubscription: any
  private statusSubscription: any
  public roomStatus: string
  private roomId: string
  public roomName: string
  public statusChangeTime: string

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpService: HttpService,
              private authService: AuthService,
              private ref: ChangeDetectorRef
             ) {
    this.routeSubscription = this.route.params.subscribe(
    (params: any) => {
      this.roomId = roomDictionary[params['roomName']]
      this.roomName = params['roomName']
    })

    this.statusSubscription = this.httpService.statusEvent
    .subscribe(roomBusy => {
      console.log('busyStuff', roomBusy, roomDictionary[Object.keys(roomBusy)[0]])
      this.roomStatus = roomBusy[this.roomId].color
      this.statusChangeTime = roomBusy[this.roomId].statusChangeTime
      this.ref.detectChanges()
    })

    this.httpService.getStatus(this.roomId)
    setInterval(() => {this.httpService.getStatus(this.roomId)}, 3000)
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
    this.statusSubscription.unsubscribe()
  }
}
