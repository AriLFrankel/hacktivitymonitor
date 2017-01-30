import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
@Component({
  selector: 'hd-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css'],
  providers: [HttpService]
})
export class HttpComponent implements OnInit {

  constructor(private httpService:HttpService) { }

  ngOnInit() {
  	this.httpService.showWindow();
  }

  ListUpcomingEvents(){
  	this.httpService.listUpcomingEvents();
  }

}
