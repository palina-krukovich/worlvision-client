import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';
import {ApiService} from '../../core/service/api.service';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';
import {Image} from '../../core/model/image';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  imagesSub: Subscription;
  images: Image[];

  constructor(
    public authService: AuthService,
    public apiService: ApiService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this._getUserImages();
  }

  private _getUserImages() {
    this.apiService.getImagesByUser()
      .subscribe((data: Image[]) => {
        this.images = data;
      });
  }


}

