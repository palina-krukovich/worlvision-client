import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/service/auth.service';
import {ApiService} from '../../core/service/api.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.sass']
})
export class GuestComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

}
