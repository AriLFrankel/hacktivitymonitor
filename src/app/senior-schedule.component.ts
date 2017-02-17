import { Component, ChangeDetectorRef } from '@angular/core'
import { HttpService } from './http.service'
import { roomDictionary } from './room-dictionary'

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

  isHappening(start, end, currTime): boolean {
    const startHour = Number(start.split(':')[0]), startMinute = Number(start.split(':')[1]),
    endHour = Number(end.split(':')[0]), endMinute = Number(end.split(':')[1]),
    currHour = Number(currTime.split(':')[0]), currMinute = Number(currTime.split(':')[1])
    return (startHour < currHour || startHour === currHour && startMinute < currMinute - 2) &&
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
    this.httpService.getEvents(roomDictionary['Senior'])
    .then( (events) => {
      this.events = [].concat(events.map( (event) => {
        const start: any = event.start.dateTime ? moment(event.start.dateTime).format('H:mm') : false
        const end: any = event.start.dateTime ? moment(event.end.dateTime).format('H:mm') : false
        const length: number = (end.toString().split(':')[0] - start.toString().split(':')[0]) * 60
        + (end.toString().split(':')[1] - start.toString().split(':')[1])
        const isHappening: boolean = this.isHappening(start.toString(), end.toString(), moment().format('H:mm').toString())
        const isRelevant: boolean = this.isRelevant(start.toString(), end.toString(), moment().format('H:mm').toString())
        const padding: string = isHappening ? '50px 20px'
        : length ? length / 3 > 40 ? '30px 20px' : Math.floor(length / 3).toString() + 'px 20px'
        : '0px 20px'
        const opacity: string = isHappening ? '1' : '.75'
        const display: string = isRelevant ? 'block' : 'none'
        return Object.assign(event, {start: start, end: end, display: display, opacity: opacity, padding: padding})
        }) )
      this.ref.detectChanges()
    })
  }

}
