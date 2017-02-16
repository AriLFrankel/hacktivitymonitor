import { Component, ChangeDetectorRef } from '@angular/core'
import { HttpService } from './http.service'

declare const moment: any

@Component({
  selector: 'hd-senior-schedule',
  template: `
  <div *ngFor='let event of events'
  [ngStyle]="{padding:event.padding, opacity:event.opacity}" class="senior event">
  <span *ngIf="event.start">{{event.start}} </span> {{event.summary}}
  </div>
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
        const start: any = event.start.dateTime ? moment(event.start.dateTime).format('H:mm') : false
        const end: any = event.start.dateTime ? moment(event.end.dateTime).format('H:mm') : false
        const length: number = (end.toString().split(':')[0] - start.toString().split(':')[0]) * 60
        + (end.toString().split(':')[1] - start.toString().split(':')[1])
        const padding: string = length ? length / 3 > 40 ? '30px 20px' : Math.floor(length / 3).toString() + 'px 20px'
        : '0px 20px'
        const opacity: string = moment().format('H:mm') > start && moment().format('H:mm') < end ? '1' : '.3'
        return Object.assign(event, {start: start, opacity: opacity, padding: padding})
        }) )
      this.ref.detectChanges()
    })
  }

}
