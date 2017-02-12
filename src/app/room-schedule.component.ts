import { Component, DoCheck, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs/Rx'
import { HttpService } from './http.service'
import { AuthService } from './auth-service.service'
import { roomDictionary} from './room-dictionary'

@Component({
  selector: 'hd-room-schedule',
  template: `
    <div>{{roomId}}</div>
    <div *ngFor='let event of events'>{{event.summary}}</div>
  `,
  providers: [HttpService, AuthService]
})
export class RoomScheduleComponent implements DoCheck, OnDestroy {
  private subscription: Subscription
  public roomId: string
  private roomName: string

  events: any[] = [{summary: 'no events in this calendar'}]

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpService: HttpService,
              private authService: AuthService
             ) {
    this.authService.signIn()
  }

  ngDoCheck() {
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
  }

}
