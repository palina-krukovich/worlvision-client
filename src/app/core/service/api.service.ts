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
}
