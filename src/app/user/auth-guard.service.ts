import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot, Router,
  CanActivate
} from '@angular/router';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import { promises } from 'dns';
import { PromiseType } from 'protractor/built/plugins';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  //  return this.checkLoggedIn(state.url);
  return this.authService.isSignInStream$.pipe(map<boolean, boolean>((isSignedIn)=>{
    if(!isSignedIn) {
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/login']);
    }
    return isSignedIn;
  }));
  }

  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Retain the attempted URL for redirection
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
