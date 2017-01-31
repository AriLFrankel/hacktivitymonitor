import { Component, OnInit } from '@angular/core';
declare var gapi:any;
declare var CLIENT_ID:any;
declare var calendarId:any;
declare var CalendarUrl:any;
declare var ROOMS:any;
declare var SCOPES:string[];

@Component({
  selector: 'HD-root',
  template: `
    <hd-auth-page></hd-auth-page>
    <div class="row">
      <hd-junior-schedule class="col-md-4"></hd-junior-schedule> 
      <hd-rooms class="col-md-4"></hd-rooms>
      <hd-senior-schedule class="col-md-4"></hd-senior-schedule>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit{
  title = 'HD works!';
  ngOnInit(){

  }
}
