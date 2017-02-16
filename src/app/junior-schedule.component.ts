import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core'
import { HttpService } from './http.service'

declare const moment: any

@Component({
  selector: 'hd-junior-schedule',
  template: `
  <div *ngFor='let event of events' class="junior event">{{event.summary}} <span *ngIf="event.start">: {{event.start}} </span> </div>
  `,
  providers: [HttpService]
})

export class JuniorScheduleComponent {
  events: any[]
  constructor(private httpService: HttpService, private ref: ChangeDetectorRef) {
    ref.detach()
    const getSchedule = this.getSchedule.bind(this)
    setTimeout(getSchedule, 1200)
  }

  getSchedule() {
    this.httpService.getEvents('hackreactor.com_ljtk4epeeca4bm4b73m09cb4c4@group.calendar.google.com')
    .then( (events) => {
      this.events = [].concat(events.map( (event) => {
        const start = event.start.dateTime ? moment(event.start.dateTime).format('H:mm') : false
        const end = event.start.dateTime ? moment(event.end.dateTime).format('H:mm') : false
        // console.log(start.toString(), end.toString(), moment().format('H:mm') > start && moment().format('H:mm') < end)
        // emit an event to update the opacity property here
        // insert time diff to minutes utility function here
          // emit result of time diff to minutes to set height here
        return Object.assign(event, {start: start, end: end})
        }) )
      this.ref.detectChanges()
    })
  }
}
