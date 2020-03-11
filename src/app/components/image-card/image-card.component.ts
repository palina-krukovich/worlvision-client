import {Component, Input, OnInit} from '@angular/core';
import {Image} from '../../core/model/image';
import {ApiService} from '../../core/service/api.service';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.sass']
})
export class ImageCardComponent implements OnInit {

  @Input() image: Image;

  constructor(
    public apiService: ApiService,
  ) { }

  ngOnInit(): void {
  }

}
