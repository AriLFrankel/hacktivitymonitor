import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

declare var gapi:any;
 
@Injectable()
export class HttpService {

  calendarId = "hackreactor.com_2d373931333934353637@resource.calendar.google.com"
  calendarUrl = this.calendarId.split('@').join('%40')
  ROOMS = ["hackreactor.com_2d373931333934353637@resource.calendar.google.com", "hackreactor.com_32333137383234383439@resource.calendar.google.com", "hackreactor.com_3538363731393438383137@resource.calendar.google.com", "hackreactor.com_3136303231303936383132@resource.calendar.google.com", "hackreactor.com_3532303334313531373535@resource.calendar.google.com"]
  
  getRooms(rooms:string[]) {
    Promise.all(rooms.map((room) => {
      return gapi.client.calendar.calendars.get({
        'calendarId': room
      });  
    }))
    .then(roomsData =>
      roomsData.map(room => room.result)
    )
    .then((roomsInfo)=>{
      console.log(roomsInfo)
      return roomsInfo;
    })
  }

  getEvents(room:string){
    let today = new Date(new Date().toString().split(' ').slice(0,4).concat(['00:01:00']).join(' ')).toISOString()
    gapi.client.calendar.events.list({
      'calendarId': room,
      'timeMin': today,
      'minAccessRole': 'freeBusyReader'
    })
    .then(eventData => {
      console.log(eventData, eventData.result.items)
      return eventData.result.items.map( item => console.log(item))
    })
  }
}