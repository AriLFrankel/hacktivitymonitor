import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

declare let gapi:any;

@Injectable()
export class ApiGuard implements CanActivate{
  constructor(){
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(!!gapi);
    return !!gapi;
  }
}