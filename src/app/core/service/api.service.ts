import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Image} from '../model/image';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import { throwError as ObservableThrowError, Observable } from 'rxjs';
import UserCredential = firebase.auth.UserCredential;
import {Router} from '@angular/router';
import {ExportedUser} from '../model/exported-user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getImagesByUser(): Observable<Image[]> {
    return this.http.get<Image[]>(`${environment.apiUrl}image/list/user`, {params: {userId: this.authService.UserUid}});
  }

  getTopImages(): Observable<Image[]> {
    return this.http
      .get<Image[]>(`${environment.apiUrl}image/list/top`);
  }

  getImagesByQuery(parameters): Observable<Image[]> {
    return this.http
      .get<Image[]>(`${environment.apiUrl}image/list/query`, {params: parameters});
  }

  createImage(fd): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}image/create`, fd);
  }

  deleteImage(url): Observable<any> {
    if (confirm('Are you sure you want to delete this picture?')) {
      return this.http
        .delete(`${environment.apiUrl}image/delete`, {params: {imageUrl: url}});
    }
  }

  createDownload(url): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}download/create`, {params: {imageUrl: url, userId: this.authService.UserUid}});
  }

  getDownloadsCountForPast(days): Observable<number> {
    return this.http
      .get<number>(`${environment.apiUrl}download/list/time`, {params: {daysPassed: days}});
  }

  createUser(emailAddress, pass) {
    this.http
      .get(`${environment.apiUrl}user/create`, {params: {email: emailAddress, password: pass}})
      .subscribe(() => window.alert('User created'));
  }

  deleteUser(usrId) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.http
        .delete(`${environment.apiUrl}user/delete`, {params: {userId: usrId}})
        .subscribe(() => window.alert('User deleted'));
    }
  }

  listUsers(): Observable<ExportedUser[]> {
    return this.http
      .get<ExportedUser[]>(`${environment.apiUrl}user/list`);
  }
}
