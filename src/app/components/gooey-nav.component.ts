import { Component, AfterViewInit} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpService } from '../shared/http.service'
import { roomDictionary } from '../shared/room-dictionary'

declare const $: any
declare const moment: any

@Component({
  selector: 'hd-gooey-nav',
  templateUrl: './templates/gooey-nav.html',
  providers: [HttpService]
})

export class GooeyNavComponent implements AfterViewInit {
  private routeSubscription: any
  private roomId: string

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute
    ) {
    // get room name from route
    this.routeSubscription = this.route.params.subscribe(
    (params) => {
      this.roomId = roomDictionary[params['roomName']]
    })
  }

  ngAfterViewInit () {
    // each menu item's id attribute is a fraction (of an hour)
    $('.menu-item, i').on('click', (e) => {
      // show the checkmark and hide the nav
      $('.menu-open').prop('checked', false)
      $('hd-checkmark').css('display', 'block')
      $('hd-gooey-nav').css('display', 'none')
      e.preventDefault()
      // insert the event on google calendar
      this.httpService.bookRoom(this.roomId, e.target.id)
      // fire a status event to update local view
      this.httpService.statusEvent.emit({[this.roomId]: {color: 'red', statusChangeTime: moment().add(e.target.id, 'h')} })
    })
  }
}
