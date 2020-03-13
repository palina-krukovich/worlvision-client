import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../core/service/api.service';
import {ExportedUser} from '../../core/model/exported-user';
import * as firebase from 'firebase';
import {AuthService} from '../../core/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  exportedUsers: ExportedUser[];
  emailProviderId: string;
  googleProviderId: string;
  fbProviderId: string;
  twitterProviderId: string;
  githubProviderId: string;

  downloadsCount1: number;
  downloadsCount7: number;
  downloadsCount31: number;
  downloadsCount365: number;

  email: string;
  password: string;

  constructor(
    public apiService: ApiService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.apiService.listUsers()
      .subscribe((data: ExportedUser[]) => {
        this.exportedUsers = data;
      });
    this.apiService.getDownloadsCountForPast(1)
      .subscribe((data: number) => {
        this.downloadsCount1 = data;
      });
    this.apiService.getDownloadsCountForPast(7)
      .subscribe((data: number) => {
        this.downloadsCount7 = data;
      });
    this.apiService.getDownloadsCountForPast(31)
      .subscribe((data: number) => {
        this.downloadsCount31 = data;
      });
    this.apiService.getDownloadsCountForPast(365)
      .subscribe((data: number) => {
        this.downloadsCount365 = data;
      });
    this.emailProviderId = firebase.auth.EmailAuthProvider.PROVIDER_ID;
    this.googleProviderId = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
    this.fbProviderId = firebase.auth.FacebookAuthProvider.PROVIDER_ID;
    this.twitterProviderId = firebase.auth.TwitterAuthProvider.PROVIDER_ID;
    this.githubProviderId = firebase.auth.GithubAuthProvider.PROVIDER_ID;
  }

}
