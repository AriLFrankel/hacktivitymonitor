import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'hd-senior-schedule',
  template: `
  <div class="event" *ngFor='let event of events'>{{event.summary}}</div>
  `,
  providers: [HttpService]
})
export class SeniorScheduleComponent {
  events: any[] = [];

  constructor(private httpService: HttpService, private ref: ChangeDetectorRef) {
    ref.detach();
    const getSchedule = this.getSchedule.bind(this);
    setTimeout(getSchedule, 1200);
  };

  getSchedule() {
    this.httpService.getEvents('hackreactor.com_9kddcjfdij7ak91o0t2bdlpnoo@group.calendar.google.com')
    .then( (events) => {
      this.events = [].concat(events);
      this.ref.detectChanges();
    });
  };

};
