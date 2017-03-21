import { Component, ChangeDetectorRef, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { roomDictionary } from '../shared/room-dictionary'

@Component({
  selector: 'hd-junior-senior-display',
  templateUrl: './templates/junior-senior-display.html'
})

export class JuniorSeniorDisplayComponent implements OnInit {
  private routeSubscription: any
  public juniorsenior: string

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {}
  ngOnInit() {
    // pass in a value for juniorsenior from the url
    this.juniorsenior = window.location.pathname.split('').slice(1).join('')
  }
}
