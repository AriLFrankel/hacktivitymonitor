import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpService } from '../shared/http.service'
import { AuthService } from '../shared/auth.service'
import { roomDictionary } from '../shared/room-dictionary'

@Component({
  selector: 'hd-room-schedule',
  template: `
    <div >{{roomId}}</div>
    <div *ngFor='let event of events'>{{event.summary}}</div>
    <hd-gooey-nav></hd-gooey-nav>
  `,
  providers: [HttpService, AuthService]
})

export class RoomScheduleComponent implements OnDestroy {
  routeSubscription: any
  statusSubscription: any
  public roomId: string
  private roomName: string
  room: any

  events: any[] = [{summary: 'no events in this calendar'}]

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpService: HttpService,
              private authService: AuthService,
              private ref: ChangeDetectorRef
             ) {
    this.statusSubscription = this.httpService.statusEvent
    .subscribe(roomBusy => {
      this.room = roomBusy
      this.ref.detectChanges()
    })
    this.getEvents()
    this.httpService.getStatus(this.roomId)
    setInterval(this.getEvents.bind(this), 3000)
    setInterval(() => {this.httpService.getStatus(this.roomId)}, 3000)
  }

  getEvents() {
    this.routeSubscription = this.route.params.subscribe(
    (params: any) => {
      this.roomId = roomDictionary[params['roomName']]
    })
    this.httpService.getEvents(this.roomId)
    .then((events) => {
      if (events.length) {
        this.events = [].concat(events)
      } else {
        this.events = [{summary: 'no events in calendar'}]
      }
    })
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
    this.statusSubscription.unsubscribe()
  }
}
