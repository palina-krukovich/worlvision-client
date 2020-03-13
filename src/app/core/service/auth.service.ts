import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {User} from '../model/user';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        user.getIdTokenResult(true)
          .then((idTokenResult) => {
            localStorage.setItem('admin', idTokenResult.claims.admin);
          });
      } else {
        localStorage.setItem('user', null);
        localStorage.setItem('admin', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['user']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['user']);
        });
        this.SetUserData(result.user);
      });
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox');
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  get IsLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null;
  }

  get IsAdmin(): boolean {
    return this.UserUid === 'gMBatbp2umXkhmglrqlJYt4ng792';
  }

  get UserUid(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.uid;
  }

  getIdToken() {
    return firebase.auth().currentUser.getIdToken(true);
  }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  TwitterAuth() {
    return this.AuthLogin(new firebase.auth.TwitterAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }

  GithubAuth() {
    return this.AuthLogin(new firebase.auth.GithubAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['user']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  SignOut() {
    return this.afAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['guest']);
      });
  }
}
