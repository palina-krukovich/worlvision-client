import {Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

}
