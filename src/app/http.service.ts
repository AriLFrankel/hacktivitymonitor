import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

declare var gapi: any;
declare var moment: any;

@Injectable()

export class HttpService {
  @Output()
  statusEvent: EventEmitter<any> = new EventEmitter();

  getRooms(rooms: string[]) {
    return Promise.all(rooms.map((room) => {
      return gapi.client.calendar.calendars.get({
        'calendarId': room
      });
    }))
    .then(roomsData =>
      roomsData.map(room => room.result)
    )
    .then((roomsInfo) => {
      return roomsInfo;
    });
  };

  getEvents(room: string) {
    const todayMin = new Date(new Date().toString().split(' ').slice(0, 4).concat(['00:01:00']).join(' ')).toISOString();
    const todayMax = new Date(new Date().toString().split(' ').slice(0, 4).concat(['23:59:59']).join(' ')).toISOString();
    return gapi.client.calendar.events.list({
      'calendarId': room,
      'timeMin': todayMin,
      'timeMax': todayMax,
      'minAccessRole': 'freeBusyReader',
      'orderBy': 'startTime',
      'singleEvents': true
    })
    .then(eventData => {
      return eventData.result.items;
    });
  };

  addHours= function(h) {
    this.setHours(this.getHours() + h);
    return this;
  };

   getStatus(roomId) {
    const currentTime = moment().add(-6, 'h').toISOString(),
    thirtyFromNow = moment().add(-5.5, 'h').toISOString();
    let start: string, end: string;
    gapi.client.calendar.freebusy.query({
      'timeMin': (new Date()).toISOString(),
      'timeMax': this.addHours.call(new Date(), 8).toISOString(),
      'timeZone': 'America/Chicago',
      'items': [
        {
          'id': roomId
        }
      ]
    }).execute( (response) => {
      response.result.calendars[roomId].busy.forEach((busyObj) => {
        start = moment(busyObj.start).add(-6, 'h').add(-1, 'm').toISOString();
        end = moment(busyObj.start).add(-6, 'h').add(-1, 'm').toISOString();
        if (start <= currentTime && end <= currentTime) {
          this.statusEvent.emit({[roomId]: 'red'});
        }
        if (start <= thirtyFromNow && end <= currentTime) {
          this.statusEvent.emit({[roomId]: 'yellow'});
        }
      });
      this.statusEvent.emit({[roomId]: 'green'});
    });
  };
};
