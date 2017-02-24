import { Component, AfterViewInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpService } from '../shared/http.service'
import { roomDictionary } from '../shared/room-dictionary'

declare const $: any

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
    this.routeSubscription = this.route.params.subscribe(
    (params: any) => {
      this.roomId = roomDictionary[params['roomName']]
    })
  }

  ngAfterViewInit () {
    $('.menu-item').on('click', (e) => {
      console.log(this.roomId, e.target.id)
      e.preventDefault()
      this.httpService.bookRoom(this.roomId, e.target.id)
    })
  }
}
