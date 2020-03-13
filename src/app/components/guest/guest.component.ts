import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/service/auth.service';
import {ApiService} from '../../core/service/api.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html'
})
export class GuestComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public apiService: ApiService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

}
