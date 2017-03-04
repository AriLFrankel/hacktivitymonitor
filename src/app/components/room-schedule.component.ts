import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpService } from '../shared/http.service'
import { AuthService } from '../shared/auth.service'
import { roomDictionary } from '../shared/room-dictionary'
import { bannerDictionary } from '../shared/banner-dictionary'
// import * as io from 'socket.io-client';

declare const $: any
declare const moment: any

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
  public statusChangeTimeUntil: any
  public statusChangeTimeBanner: string
  public titleColor: string
  public upcomingEventDetails: string
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
      // this.titleColor = this.roomName === 'Lovelace' ? '#000' : '#FFF'
    })

    // listen for 'status' events
    this.statusSubscription = this.httpService.statusEvent
    .subscribe(roomBusy => {
      // update roomstatus
      this.roomStatus = roomBusy[this.roomId].color
      // update statusChangeTimeBanner to display when room is available / busy
      this.statusChangeTimeBanner = roomBusy[this.roomId].statusChangeTime === 'tomorrow' ? 'TOMORROW'
      : roomBusy[this.roomId].statusChangeTime.format('H:mm')
      // update statusChangeTime to reflect how much time remains in hours until the room will be free
      this.statusChangeTimeUntil = roomBusy[this.roomId].statusChangeTime === 'tomorrow' ? 2
      : roomBusy[this.roomId].statusChangeTime.diff(moment()) / 3600000
      
      // change background color
      $('html').css('background', roomBusy[this.roomId].color)
      
      // update upcoming event details - needed for ending early
      this.upcomingEventDetails = roomBusy[this.roomId].eventDetails
      $('#endEarly').on('click', () => {
          this.httpService.freeRoom(this.upcomingEventDetails)
          $('#endEarly').css('display', 'none')
          $('hd-checkmark').css('display', 'block')
        })
      if (this.roomStatus === 'red') {
        if($('hd-checkmark').css('display', 'none')){
          // Make the end early button available
          $('#endEarly').css('display', 'block')
        }
        // rm gooey nav and checkmark from view
        $('hd-gooey-nav, .bumper').css('display', 'none')
        $('#\\.16, #\\.3, #\\.5, #\\.75, #1').css('display', 'none')
        $('hd-checkmark').css('display', 'none')
      } else {
        $('hd-checkmark').css('display', 'none')
        // hide the end early button
        $('#endEarly').css('display', 'none')
        // put gooey nav and checkmark back in to view
        if (this.roomStatus === 'green' && $('hd-checkmark').css('display') === 'none' ) {
          $('hd-gooey-nav, #\\.16, #\\.3, #\\.5, #\\.75, #1, .bumper').css('display', 'block')
        } else if (this.roomStatus === 'yellow') {
          $('#\\.75, #1, #\\.5').css('display', 'none')
          // change text colors to black
          // $('#AvailableBusy, #until, #statusChangeTime').css('color', 'black')
          
          // conditionally show buttons for booking on how long room is available
          if (this.statusChangeTimeUntil < .3 ) {
              $('#\\.3').css('display', 'none')
            if ( this.statusChangeTimeUntil <= .17 ) {
              $('hd-gooey-nav, #\\.3, #\\.16, .bumper').css({'display': 'block', 'visibility': 'hidden'})
            }
          } else {
            $('#\\.16, #\\.3').css('display', 'block')
          }
        }
      }
      // trigger a rerender
      this.ref.detectChanges()
    })

    // get the room's status, which will emit status events
    // set an interval to get room status every 3 seconds
    this.httpService.getStatus(this.roomId)
    setInterval(() => {this.httpService.getStatus(this.roomId)}, 4000)
  }

  // avoid memory leaks by unsubscribing on destroy
  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
    this.statusSubscription.unsubscribe()
  }
}
