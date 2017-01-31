import { Component } from '@angular/core';

@Component({
  selector: 'HD-root',
  template: `
    <hd-auth-page></hd-auth-page>
    <div class="row">
      <hd-junior-schedule class="col-md-4"></hd-junior-schedule> 
      <hd-rooms (statusEvent)="updateStatus($event)" class="col-md-4"></hd-rooms>
      <hd-senior-schedule class="col-md-4"></hd-senior-schedule>
    </div>
  `
})

export class AppComponent {

  updateStatus(event:any){
    console.log('updateStatus event fired', event);
  }
}
