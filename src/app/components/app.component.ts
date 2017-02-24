import { Component } from '@angular/core'

@Component({
  selector: 'hd-app-component',
  template: `
    <div class="row">
      <hd-weather class="col-md-4"></hd-weather>
      <div class="col-md-4"><img id='logo' src='./Final.png'></div>
      <hd-clock class="col-md-4" id="time-main"></hd-clock>
    </div>
    <div class="row">
      <hd-junior-senior [juniorsenior]="'Senior'" class="col-md-4 schedule"></hd-junior-senior>
      <hd-rooms class="col-md-4 center"></hd-rooms>
      <hd-junior-senior [juniorsenior]="'Junior'" class="col-md-4 schedule"></hd-junior-senior> 
    </div>
  `
})
export class AppComponent {
}
