import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpService } from '../shared/http.service'
import { AuthService } from '../shared/auth.service'
import { roomDictionary } from '../shared/room-dictionary'
import { bannerDictionary } from '../shared/banner-dictionary'
// import * as io from 'socket.io-client';

declare const $: any

@Component({
  selector: 'hd-room-schedule',
  templateUrl: './templates/room-schedule.html',
  providers: [HttpService, AuthService]
})

export class RoomScheduleComponent implements OnDestroy {
  private routeSubscription: any
  private statusSubscription: any
  public roomStatus: string
  private roomId: string
  public roomName: string
  public bannerColor: string
  public statusChangeTime: string
  public titleColor: string
  // private socket: any
  // private io: any

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpService: HttpService,
              private authService: AuthService,
              private ref: ChangeDetectorRef
             ) {
    // get room name from route and roomId from roomDictionary
    this.routeSubscription = this.route.params.subscribe(
    (params: any) => {
      this.roomId = roomDictionary[params['roomName']]
      this.roomName = params['roomName']
      this.bannerColor = bannerDictionary[params['roomName']]
      this.titleColor = this.roomName === 'Lovelace' ? '#000' : '#FFF'
    })

    // listen for 'status' events
    this.statusSubscription = this.httpService.statusEvent
    .subscribe(roomBusy => {
      // update roomstatus
      this.roomStatus = roomBusy[this.roomId].color
      // update statusChangeTime to display when room is available / busy
      this.statusChangeTime = roomBusy[this.roomId].statusChangeTime
      $('html').css('background', roomBusy[this.roomId].color)
      if (this.roomStatus === 'red' || this.roomStatus === 'yellow') {
        // rm gooey nav and checkmark from view
        $('hd-gooey-nav').css({display: 'block', visibility: 'hidden'})
        $('hd-checkmark').css('display', 'none')
      } else {
        $('hd-gooey-nav').css('visibility', 'visible')
      }
      // trigger a rerender
      this.ref.detectChanges()
    })

    // get the room's status, which will emit status events
    // set an interval to get room status every 3 seconds
    this.httpService.getStatus(this.roomId)
    setInterval(() => {this.httpService.getStatus(this.roomId)}, 3000)
  }

  // avoid memory leaks by unsubscribing on destroy
  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
    this.statusSubscription.unsubscribe()
  }
}
