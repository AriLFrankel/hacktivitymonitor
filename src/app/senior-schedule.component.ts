import { Component, ChangeDetectorRef } from '@angular/core'
import { HttpService } from './http.service'

declare const moment: any

@Component({
  selector: 'hd-senior-schedule',
  template: `
  <div *ngFor='let event of events'
  [ngStyle]="{padding:event.padding, opacity:event.opacity, display:event.display}" class="senior event">
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
    setInterval(getSchedule, 60000)
  }

  isHappening(start, end, currTime): Boolean {
    const startHour = Number(start.split(':')[0]), startMinute = Number(start.split(':')[1]),
    endHour = Number(end.split(':')[0]), endMinute = Number(end.split(':')[1]),
    currHour = Number(currTime.split(':')[0]), currMinute = Number(currTime.split(':')[1])
    return (startHour < currHour || startHour === currHour && startMinute < currMinute) &&
    (endHour > currHour || endHour === currHour && endMinute > currMinute)
  }

  isRelevant(start, end, currTime): boolean {
    const startHour = Number(start.split(':')[0]), startMinute = Number(start.split(':')[1]),
    endHour = Number(end.split(':')[0]), endMinute = Number(end.split(':')[1]),
    currHour = Number(currTime.split(':')[0]), currMinute = Number(currTime.split(':')[1]),
    threeHoursFromNowHour = Number(currTime.split(':')[0]) + 3 , threeHoursAgoHour = Number(currTime.split(':')[0]) - 3
    return startHour >= threeHoursAgoHour && endHour <= threeHoursFromNowHour
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
        const opacity: string = this.isHappening(start.toString(), end.toString(), moment().format('H:mm').toString()) ? '1' : '.3'
        const display: string = this.isRelevant(start.toString(), end.toString(), moment().format('H:mm').toString()) ? 'block' : 'none'
        return Object.assign(event, {start: start, end: end, display: display, opacity: opacity, padding: padding})
        }) )
      this.ref.detectChanges()
    })
  }

}
