import { Component } from '@angular/core'

@Component({
  selector: 'hd-hackerspace-component',
  template: `
    <hd-auth-page></hd-auth-page>
    <div class="row">
      <hd-weather class="col-md-4"></hd-weather>
      <div class="col-md-4"><img id='logo' src='./Final.png'></div>
      <hd-clock class="col-md-4"></hd-clock>
    </div>
    <div class="row">
      <hd-senior-schedule class="col-md-4 schedule"></hd-senior-schedule>
      <hd-rooms class="col-md-4 center"></hd-rooms>
      <hd-junior-schedule class="col-md-4 schedule"></hd-junior-schedule> 
    </div>
  `
})
export class HackerspaceComponent {
}
