import { Component, ChangeDetectorRef } from '@angular/core'
import { HttpService } from './http.service'

declare const moment: any

@Component({
  selector: 'hd-senior-schedule',
  template: `
  <div *ngFor='let event of events' class="event senior">{{event.summary}} <span *ngIf="event.start">: {{event.start}} </span> </div>
  `,
  providers: [HttpService]
})
export class SeniorScheduleComponent {
  events: any[] = []

  constructor(private httpService: HttpService, private ref: ChangeDetectorRef) {
    ref.detach()
    const getSchedule = this.getSchedule.bind(this)
    setTimeout(getSchedule, 1200)
  }

  getSchedule() {
    this.httpService.getEvents('hackreactor.com_9kddcjfdij7ak91o0t2bdlpnoo@group.calendar.google.com')
    .then( (events) => {
      this.events = [].concat(events.map( (event) => {
        const start = event.start.dateTime ? moment(event.start.dateTime).format('h:mm') : false
        const end = event.start.dateTime ? moment(event.end.dateTime).format('h:mm') : false
        return Object.assign(event, {start: start, end: end})
        }) )
      
      this.ref.detectChanges()
    })
  }

}
