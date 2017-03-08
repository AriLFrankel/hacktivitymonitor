import { Injectable, EventEmitter, Output } from '@angular/core'
import { Http, Response, Headers } from '@angular/http'
import { roomDictionary } from './room-dictionary'

declare const gapi: any
declare const moment: any
declare const httpService: any

@Injectable()

export class HttpService {
  // an emitter for updating rooms' statuses
  @Output()
  statusEvent: EventEmitter<any> = new EventEmitter()

  /* get */
  // retrieve room data from gcal
  // return a promise containing an array of rooms with details
  getRooms(rooms: string[]): any {
    return Promise.all(rooms.map((room) => {
      return gapi.client.calendar.calendars.get({
        'calendarId': room
      })
    }))
    .then(roomsData => roomsData.map(room => room.result) )
  }

  // get the events within a 24 hour period for a specific room
  // Return an array of event objects
  getEvents(room: string): any {
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
    .then( eventData => eventData.result.items )
  }

  // get and emit room status updates. Return nothing
  getStatus(roomId: string): void {
    const currentTime = moment().toISOString(),
    thirtyFromNow = moment().add(.5, 'h').toISOString()
    this.getEvents(roomId)
    .then( (events: any[] ) => {
      const filteredEvents = events.filter( event => moment(event.end.dateTime).toISOString() >= moment().toISOString())
      console.log('events before sort and filter', moment().format('H:mm'), filteredEvents.map( event => [moment(event.start.dateTime).format('H:mm'), moment(event.end.dateTime).format('H:mm')]))
      filteredEvents.reverse()
      // .filter( event => moment().isBefore(moment(event.end.dateTime)) )
      // console.log('events after sort and filter', events.map( event => [event.start.dateTime, event.end.dateTime]))
      filteredEvents.forEach((event) => {
        const start = moment(event.start.dateTime).toISOString(),
        end = moment(event.end.dateTime).toISOString(),
        eventDetails = {
          id: event.id,
          description: event.description || '',
          summary: event.summary || '',
          start: event.start,
          end: event.end,
          location: event.location
        }
        if (start <= thirtyFromNow && start >= currentTime) {
          this.statusEvent.emit({[roomId]: {color: 'yellow', statusChangeTime: moment(start), eventDetails: eventDetails} })
        } else if (start <= currentTime && end >= currentTime) {
        // console.log('eventDetails object', eventDetails)
          this.statusEvent.emit({[roomId]: {color: 'red', statusChangeTime: moment(end), eventDetails: eventDetails} })
        } else if (start > thirtyFromNow) {
          this.statusEvent.emit({[roomId]: {color: 'green', statusChangeTime: moment(start), eventDetails: eventDetails} })
        } else {
          this.statusEvent.emit({[roomId]: {color: 'green', statusChangeTime: 'tomorrow',  eventDetails: eventDetails} })
        }
      })
      if (filteredEvents.length === 0) {
        this.statusEvent.emit({[roomId]: {color: 'green', statusChangeTime: 'tomorrow'} })
      }
    })
  }

  // get and format events for junior and senior schedules. Return a promise
  getSchedule(roomId: string): any {
    return this.getEvents(roomId)
    .then( (events: any[]) => {
      const currentTime = moment().toISOString(),
      twoHoursFromNow = moment().add(2, 'h').toISOString()
      return events.map( (event: any) => {
        let start = event.start.dateTime ? moment(event.start.dateTime).toISOString() : '',
        end = event.end.dateTime ? moment(event.end.dateTime).toISOString() : ''
        const isHappening: boolean = start <= currentTime && end >= currentTime,
        isRelevant: boolean = isHappening || start === '' || start < twoHoursFromNow && end >= currentTime ? true : false,
        padding: string = isHappening ? '50px 20px' : '10px 20px',
        opacity: string = isHappening ? '1' : '.75',
        display: string = isRelevant ? 'block' : 'none'
        start = start === '' ? '' : moment(start).format('H:mm')
        end = end === '' ? '' : moment(end).format('H:mm')
        return Object.assign(event, {start: start, end: end, display: display, opacity: opacity, padding: padding})
      }).filter( event => event.display === 'block')
      .slice(0, 5)
    })
  }

  /* post */
  // create a 'last minute' booking
  bookRoom (roomId: string, length: number): void {
    const event: any = {
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
  // end a booking early by updating its end time on Google
  // requires event editing permission

  freeRoom (eventDetails: any): void {
    const event = {
      'summary': eventDetails.summary,
      'location': eventDetails.location,
      'description': eventDetails.description,
      'start': {
        'dateTime': eventDetails.start.dateTime,
      },
      'end': {
        'dateTime': eventDetails.end.dateTime,
      },
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10}
        ]
      }
    };  
    const request = gapi.client.calendar.events.update({
      'calendarId': 'primary',
      'eventId': eventDetails.id,
      'resource': event
    })
    request.execute( (event) => {
      // console.log(event)
    })
  }
}
