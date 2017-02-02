import { Component } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'hd-senior-schedule',
  template: `
  <div>
    <a [routerLink]="['/Senior']">Senior View</a>
    <div>Senior Schedule</div>
    <div *ngFor='let event of events'>{{event.summary}}</div>
  </div>
    <button (click)="getSchedule()">get senior schedule</button>
  `,
  providers: [HttpService]
})
export class SeniorScheduleComponent {
  events:any[] = [];

  constructor(private httpService:HttpService) { }

  getSchedule() {
    this.httpService.getEvents('hackreactor.com_9kddcjfdij7ak91o0t2bdlpnoo@group.calendar.google.com')
    .then( (events) => {
      this.events = [].concat(events)
    })
  }

}
