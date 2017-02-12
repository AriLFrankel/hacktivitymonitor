import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'hd-clock',
  template: `
    <div id="time"></div>
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
    document.getElementById('time').innerHTML =
    h + ':' + m + ':' + s
    const t = setTimeout(startTime, 500)
    }
    function checkTime(i) {
        if (i < 10) {i = '0' + i}  // add zero in front of numbers < 10
        return i
    }
    startTime()
  }

}
