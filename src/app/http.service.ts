import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
// import * as API from './api';

declare var gapi:any;
declare var CLIENT_ID:any;
declare var calendarId:any;
declare var CalendarUrl:any;
declare var ROOMS:any;
declare var SCOPES:string[];
declare var window:any;
 
@Injectable()
export class HttpService {
  showWindow(){
    console.log(window.gapiResponse);
  }
  listUpcomingEvents(elemId:string = 'loadEventsHere') {
      console.log(elemId, typeof elemId);
      var pre = document.getElementById(elemId);
      console.log(pre);
      gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then( (response) => {
        var textContent;
        var events = response.result.items;
        if (events.length > 0) {
          for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) {
              when = event.start.date;
            }
            textContent = document.createTextNode(event.summary + '(' + when + ')' + '\n');
          }
        } else {
          textContent = document.createTextNode('No upcoming events found.');
        }
        pre.appendChild(textContent)
      });
    }
}