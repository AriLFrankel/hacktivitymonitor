import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Rx'

declare const gapi: any

@Injectable()
export class ApiGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(!!gapi)
    return !!gapi
  }
}
