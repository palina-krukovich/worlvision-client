import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/service/auth.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.sass']
})
export class GuestComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
