import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const user = this.auth.getUser();

    if (user == null) {
      this.router.navigate(['login']);
      return false;

    } else if (user && user.plan_id === 1) {
      this.router.navigate(['optin']);
      return false;
    }

    if ( this.auth.check() ) {
      return true;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if ( this.auth.check() ) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}