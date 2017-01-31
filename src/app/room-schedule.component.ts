import { Component, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs/Rx";
import { HttpService } from './http.service';

@Component({
  selector: 'hd-room-schedule',
  template: `
    <div>{{roomId}}</div>
    <div *ngFor='let event of events'>{{event.summary}}</div>
  `,
  providers: [HttpService]
})
export class RoomScheduleComponent implements DoCheck {
  private subscription: Subscription;
  private roomId: string;
  events: any[] = [{summary: 'butts'}];

  constructor(private router:Router, 
  	          private route:ActivatedRoute,
  	          private httpService:HttpService
  	         ) { }

  ngDoCheck() {
  	this.subscription = this.route.params.subscribe(
	  (params:any) => {
        this.roomId = params['id']
	})
    this.httpService.getEvents(this.roomId)
	.then( (events) => {
	  console.log('events in then', events);
	  if(events.length) this.events = [].concat(events);
      else this.events = [{summary: 'no events in calendar'}]
      console.log(this.events);
	})
  }
  
  ngOnDestroy(){
  	this.subscription.unsubscribe();
  }

}
