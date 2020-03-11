import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Image} from '../model/image';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import { throwError as ObservableThrowError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getImagesByUser(): Observable<Image[]> {
    return this.http
      .get<Image[]>(`${environment.apiUrl}image/list/user`, {params: {uid: this.authService.UserUid}});
  }
}
