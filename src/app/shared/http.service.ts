import { Injectable, EventEmitter, Output } from '@angular/core'
import { Http, Response, Headers } from '@angular/http'
import { roomDictionary } from './room-dictionary'

declare const gapi: any
declare const moment: any
declare const httpService: any

@Injectable()

export class HttpService {
  @Output()
  statusEvent: EventEmitter<any> = new EventEmitter()

  /* get */
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

  getStatus(roomId: string) {
    // console.log(roomId, roomDictionary[roomId])
    const currentTime = moment().toISOString(),
    thirtyFromNow = moment().add(.5, 'h').toISOString(),
    addHours = this.addHours
    gapi.client.calendar.freebusy.query({
      'timeMin': (new Date()).toISOString(),
      'timeMax': addHours.call(new Date(), 8),
      'timeZone': 'America/Chicago',
      'items': [
        {
          'id': roomId
        }
      ]
    })
    .execute( (response: any) => {
      const events = response.result.calendars[roomId].busy
      events.sort( (a, b) => moment(a.start).isBefore(b.start) ? 1 : -1)
      events
      .forEach((busyObj) => {
        const start = moment(busyObj.start).toISOString()
        const end = moment(busyObj.end).toISOString()
        if (start <= thirtyFromNow && start >= currentTime) {
          this.statusEvent.emit({[roomId]: {color: 'yellow', statusChangeTime: moment(end).format('H:mm')} })
        } else if (start <= currentTime && end >= currentTime) {
          this.statusEvent.emit({[roomId]: {color: 'red', statusChangeTime: moment(end).format('H:mm')} })
        } else {
          this.statusEvent.emit({[roomId]: {color: 'green', statusChangeTime: moment(start).format('H:mm')} })
        }
      })
      if (response.result.calendars[roomId].busy.length === 0) {
        this.statusEvent.emit({[roomId]: {color: 'green', statusChangeTime: 'tomorrow'} })
      }
    })
  }

  getSchedule(roomId: string) {
    return this.getEvents(roomId)
    .then( (events: any[]) => {
      return [].concat(events.map( (event: any) => {
        const start: any = event.start.dateTime ? moment(event.start.dateTime).format('H:mm') : ''
        const end: any = event.start.dateTime ? moment(event.end.dateTime).format('H:mm') : ''
        const length: number = (end.toString().split(':')[0] - start.toString().split(':')[0]) * 60
        + (end.toString().split(':')[1] - start.toString().split(':')[1])
        const isHappening: boolean = this.isHappening(start.toString(), end.toString(), moment().format('H:mm').toString())
        const isRelevant: boolean = isHappening ? true
        : start === '' ? true
        : this.isRelevant(start.toString(), end.toString(), moment().format('H:mm').toString())
        const padding: string = isHappening ? '50px 20px'
        : '10px 20px'
        const opacity: string = isHappening ? '1' : '.75'
        const display: string = isRelevant ? 'block' : 'none'
        return Object.assign(event, {start: start, end: end, display: display, opacity: opacity, padding: padding})
        })
      ).filter( event => event.display === 'block')
      .slice(0, 5)
    })
  }

  /* post */
  bookRoom (roomId: string, length: number) {
    const event = {
      'summary': 'Last Minute Booking',
      'location': ' 800 Brazos Street, Austin, TX 78701',
      'description': 'last minute room booking',
      'start': {
        'dateTime': moment().toISOString(),
        'timeZone': 'America/Chicago'
      },
      'end': {
        'dateTime': moment().add(length, 'h').toISOString(),
        'timeZone': 'America/Chicago'
      },
      'attendees': [
        {'email': roomId}
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10}
        ]
      }
    }

    const request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    })

    request.execute( () => {
      this.statusEvent.emit({[roomId]: {color: 'red', statusChangeTime: moment(event.end.dateTime)} })
    })
  }

  /* helpers */
  addHours = function(h) {
    this.setHours(this.getHours() + h)
    return this
  }

  isHappening(start, end, currTime): boolean {
    const startHour = Number(start.split(':')[0]), startMinute = Number(start.split(':')[1]),
    endHour = Number(end.split(':')[0]), endMinute = Number(end.split(':')[1]),
    currHour = Number(currTime.split(':')[0]), currMinute = Number(currTime.split(':')[1])
    return (startHour < currHour || startHour === currHour && startMinute < currMinute + 2) &&
    (endHour > currHour || endHour === currHour && endMinute > currMinute)
  }

  isRelevant(start, end, currTime): boolean {
    const startHour = Number(start.split(':')[0]), startMinute = Number(start.split(':')[1]),
    endHour = Number(end.split(':')[0]), endMinute = Number(end.split(':')[1]),
    currHour = Number(currTime.split(':')[0]), currMinute = Number(currTime.split(':')[1]),
    twoFromNowHour = Number(currTime.split(':')[0]) + 2
    return startHour >= currHour || startHour === currHour && startMinute >= currMinute - 5
  }

}
