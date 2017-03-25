import { Component, ChangeDetectorRef, Input } from '@angular/core'
import { HttpService } from '../shared/http.service'
import { roomDictionary } from '../shared/room-dictionary'

declare const moment: any

@Component({
  selector: 'hd-junior-senior',
  templateUrl: './templates/junior-senior.html',
  providers: [HttpService]
})

export class JuniorSeniorComponent {
  events: any[] = []
  @Input() juniorsenior: string
  @Input() vertical: boolean
  
  constructor(private httpService: HttpService, private ref: ChangeDetectorRef) {
    ref.detach()
    const getSchedule = this.getSchedule.bind(this)
    // TODO: find alternative to setTimeout to handle async Gapi load
    setTimeout(getSchedule, 1200)
    // ping GAPI on an interval
    setInterval(getSchedule, 60000)
  }

  getSchedule() {
    // get this room's schedule, which will fire status events
    this.httpService.getSchedule(roomDictionary[this.juniorsenior])
    .then( (eventsArr) => {
      // update padding to adjust for vertical / horizontal display
      this.events = this.vertical ? eventsArr.map( event => 
        Object.assign(event, 
          {padding: event.padding === "10px 20px" ? "80px 20px" : "200px 20px"} )) : eventsArr

      // trigger a rerender
      this.ref.detectChanges()
    })
  }

}
