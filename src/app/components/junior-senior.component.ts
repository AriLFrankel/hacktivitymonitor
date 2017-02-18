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

  constructor(private httpService: HttpService, private ref: ChangeDetectorRef) {
    ref.detach()
    const getSchedule = this.getSchedule.bind(this)
    setTimeout(getSchedule, 1200)
    setInterval(getSchedule, 60000)
  }

  getSchedule() {
    this.httpService.getSchedule(roomDictionary[this.juniorsenior])
    .then( (eventsArr) => {
      this.events = eventsArr
      this.ref.detectChanges()
    })
  }

}