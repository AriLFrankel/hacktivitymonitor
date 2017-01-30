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
   	<h1>App Loads</h1>
	<hd-http></hd-http>
    <hd-auth-page></hd-auth-page>
  `,
  styles: []
})
export class AppComponent implements OnInit{
  title = 'HD works!';
  ngOnInit(){

  }
}
