import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hd-hackerspace-component',
  template: `
    <hd-auth-page></hd-auth-page>
    <div class="row">
      <hd-junior-schedule class="col-md-4"></hd-junior-schedule> 
      <hd-rooms (statusEvent)="updateStatus($event)" class="col-md-4"></hd-rooms>
      <hd-senior-schedule class="col-md-4"></hd-senior-schedule>
    </div>
  `,
  styles: []
})
export class HackerspaceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
