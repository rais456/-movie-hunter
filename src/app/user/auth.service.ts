import { Injectable, NgZone } from '@angular/core';

import { User } from './user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User | null;
  redirectUrl: string;
  userData: firebase.User | null;
  isSignInStream$: Observable<boolean>;

  constructor(public  afAuth:  AngularFireAuth) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        console.log('User is signed as'+ user);
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
        console.log('user is note signed in');
      }
    })
    this.isSignInStream$=this.afAuth.authState
    .pipe(map<firebase.User, boolean>((user: firebase.User)=>{
      return user !=null;
    }
  ));
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(email: string, password: string) {
    // Code here would log into a back end service
    // and return user information
    // This is just hard-coded here.
    // this.currentUser = {
    //   id: 2,
    //   userName,
    //   isAdmin: false
    // };
    //fire base login user credential check

    return this.afAuth.signInWithEmailAndPassword(email, password);

  }

  logout() {
    this.currentUser = null;
    return this.afAuth.signOut();
  }
}
