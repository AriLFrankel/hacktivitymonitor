import { Component } from '@angular/core'

@Component({
  selector: 'hd-hackerspace-component',
  template: `
    <hd-auth-page></hd-auth-page>
    <div class="row">
      <hd-senior-schedule class="col-md-4"></hd-senior-schedule>
      <div class="col-md-4">
        <hd-weather></hd-weather>
        <hd-clock></hd-clock>
        <hd-rooms></hd-rooms>
        <img src='http://hrhqdir.s3.amazonaws.com/brand-guide/HackReactor_RGBLogo-White-Blue.png' width="100%">
      </div>
      <hd-junior-schedule class="col-md-4"></hd-junior-schedule> 
    </div>
  `
})
export class HackerspaceComponent {
}
