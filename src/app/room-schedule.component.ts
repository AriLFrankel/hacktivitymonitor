import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpService } from './http.service'
import { AuthService } from './auth-service.service'
import { roomDictionary } from './room-dictionary'

@Component({
  selector: 'hd-room-schedule',
  template: `
    <div >{{roomId}}</div>
    <div *ngFor='let event of events'>{{event.summary}}</div>
    <hd-gooey></hd-gooey>
  `,
  providers: [HttpService, AuthService]
})

export class RoomScheduleComponent implements OnDestroy {
  subscription: any
  subscription2: any
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
    this.subscription2 = this.httpService.statusEvent
    .subscribe(roomBusy => {
      this.room = roomBusy
      this.ref.detectChanges()
    })
    this.authService.signIn()
    this.getEvents()
    setInterval(this.getEvents.bind(this), 3000);
    this.httpService.getStatus(this.roomId)
    setInterval(() => {this.httpService.getStatus(this.roomId)}, 3000);
  }

  getEvents() {
    this.subscription = this.route.params.subscribe(
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
    this.subscription.unsubscribe()
    this.subscription2.unsubscribe()
  }
}
