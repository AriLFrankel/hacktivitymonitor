import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core'
import { HttpService } from './http.service'

@Component({
  selector: 'hd-junior-schedule',
  template: `
  <div *ngFor='let event of events' class="junior event">{{event.summary}} </div>
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
      this.events = [].concat(events)
      this.ref.detectChanges()
    })
  }

}
