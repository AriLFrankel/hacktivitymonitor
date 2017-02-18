import { Injectable, EventEmitter, Output } from '@angular/core'
import { Http, Response, Headers } from '@angular/http'

declare const gapi: any
declare const moment: any

@Injectable()

export class HttpService {
  @Output()
  statusEvent: EventEmitter<any> = new EventEmitter()

  getRooms(rooms: string[]) {
    return Promise.all(rooms.map((room) => {
      return gapi.client.calendar.calendars.get({
        'calendarId': room
      })
    }))
    .then(roomsData =>
      roomsData.map(room => room.result)
    )
    .then((roomsInfo) => {
      return roomsInfo
    })
  }

  getEvents(room: string) {
    const todayMin = new Date(new Date().toString().split(' ').slice(0, 4).concat(['00:01:00']).join(' ')).toISOString()
    const todayMax = new Date(new Date().toString().split(' ').slice(0, 4).concat(['23:59:59']).join(' ')).toISOString()
    return gapi.client.calendar.events.list({
      'calendarId': room,
      'timeMin': todayMin,
      'timeMax': todayMax,
      'minAccessRole': 'freeBusyReader',
      'orderBy': 'startTime',
      'singleEvents': true
    })
    .then(eventData => {
      return eventData.result.items
    })
  }

  addHours= function(h) {
    this.setHours(this.getHours() + h)
    return this
  }

   getStatus(roomId: string) {
    const currentTime = moment().add(-6, 'h').toISOString(),
    thirtyFromNow = moment().add(-5.5, 'h').toISOString()
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
      console.log(response.result.calendars[roomId])
      response.result.calendars[roomId].busy.forEach((busyObj) => {
        // console.log(busyObj)
        const start = moment(busyObj.start).add(-6, 'h').add(-1, 'm').toISOString()
        const end = moment(busyObj.end).add(-6, 'h').add(-1, 'm').toISOString()
        if (start <= thirtyFromNow && start >= currentTime) {
          this.statusEvent.emit({[roomId]: 'yellow'})
        } else if (start <= currentTime && end >= currentTime) {
          this.statusEvent.emit({[roomId]: 'red'})
        } else {
          this.statusEvent.emit({[roomId]: 'green'})
        }
      })
    })
  }
}
