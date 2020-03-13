import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Image} from '../../core/model/image';
import {ApiService} from '../../core/service/api.service';
import {AuthService} from '../../core/service/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html'
})
export class ImageCardComponent implements OnInit {

  @Input() image: Image;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(
    public apiService: ApiService,
    public authService: AuthService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  downloadImage() {
    this.apiService.createDownload(this.image.url)
      .subscribe(() => {
        this.image.downloadsCount += 1;
      });
  }

  deleteImage() {
    this.apiService.deleteImage(this.image.url)
      .subscribe(() => {
        this.delete.emit();
      });
  }
}
