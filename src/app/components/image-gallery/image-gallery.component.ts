import {Component, Input, OnInit} from '@angular/core';
import {Image} from '../../core/model/image';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.sass']
})
export class ImageGalleryComponent implements OnInit {

  @Input() images: Image[];

  constructor() { }

  ngOnInit(): void {
  }

  deleteImage(url) {
    this.images = this.images.filter(image => image.url !== url);
  }

}
