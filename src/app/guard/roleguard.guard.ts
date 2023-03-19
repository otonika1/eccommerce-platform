import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleguardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isActivated(route);
  }
  private isActivated(route: ActivatedRouteSnapshot): boolean {
    //if(localStorage.getItem('token') === 'admin123'){      
      const roles = ['Admin','Editor'];
      const expRoles = localStorage.getItem("role");
      const Match = roles.findIndex(role => expRoles?.indexOf(role) !== -1);
      return Match < 0 ? false : true;
    //}
  }
}
