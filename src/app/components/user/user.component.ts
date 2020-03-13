import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';
import {ApiService} from '../../core/service/api.service';
import {Subscription} from 'rxjs';
import {Image} from '../../core/model/image';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  images: Image[];

  constructor(
    public authService: AuthService,
    public apiService: ApiService,
    public router: Router,
    public translate: TranslateService
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

