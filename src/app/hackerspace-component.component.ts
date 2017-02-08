import { Component } from '@angular/core';

@Component({
  selector: 'hd-hackerspace-component',
  template: `
    <hd-auth-page></hd-auth-page>
    <div class="row">
      <hd-senior-schedule class="col-md-4"></hd-senior-schedule>
      <hd-rooms class="col-md-4"></hd-rooms>
      <hd-junior-schedule class="col-md-4"></hd-junior-schedule> 
    </div>
  `
})
export class HackerspaceComponent {
}