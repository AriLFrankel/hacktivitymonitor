import { Component, OnInit } from '@angular/core'

declare const $: any

@Component({
  selector: 'hd-clock',
  template: `
    <div class="time" style="font-family:'Orbitron'"></div>
  `,
  styles: []
})
export class ClockComponent implements OnInit {

  ngOnInit() {
    function startTime() {
      const today = new Date()
      const h = today.getHours()
      let m = today.getMinutes()
      let s = today.getSeconds()
      m = checkTime(m)
      s = checkTime(s)

      $('.time').empty().append(`<div id="clock"><span id="hours">${h}</span>
        : <span id="minutes">${m}</span>
        : <span id="seconds">${s}</span></div>`)

      const t = setTimeout(startTime, 500)
      }
      function checkTime(i) {
          if (i < 10) {i = '0' + i}  // add zero in front of numbers < 10
          return i
      }
      startTime()
    }

}
