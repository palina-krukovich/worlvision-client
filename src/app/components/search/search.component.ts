import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/service/auth.service';
import {ApiService} from '../../core/service/api.service';
import {Router} from '@angular/router';
import {Image} from '../../core/model/image';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  colors = [
    {red: 244, green: 67, blue: 54, isSelected: false},
    {red: 255, green: 152, blue: 0, isSelected: false},
    {red: 255, green: 235, blue: 59, isSelected: false},
    {red: 76, green: 275, blue: 80, isSelected: false},
    {red: 0, green: 188, blue: 212, isSelected: false},
    {red: 33, green: 150, blue: 243, isSelected: false},
    {red: 156, green: 39, blue: 176, isSelected: false},
    {red: 233, green: 30, blue: 99, isSelected: false},
    {red: 255, green: 255, blue: 255, isSelected: false},
    {red: 158, green: 158, blue: 158, isSelected: false},
    {red: 0, green: 0, blue: 0, isSelected: false},
    {red: 93, green: 64, blue: 55, isSelected: false}
  ];
  times = [
    {key: 0, value: 'Any time'},
    {key: 1, value: 'Past 24 hours'},
    {key: 7, value: 'Past week'},
    {key: 31, value: 'Past month'},
    {key: 365, value: 'Past year'},
  ];
  selectedColorIndex = -1;
  selectedTimeIndex = 0;
  tags: string;
  images: Image[];
  isLoading = false;
  noImages = false;

  constructor(
    public authService: AuthService,
    public apiService: ApiService,
    public router: Router,
    public translate: TranslateService
  ) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.get('SEARCH.ANY_TIME').subscribe((text: string) => {
        this.times[0].value = text;
      });
      this.translate.get('SEARCH.TODAY').subscribe((text: string) => {
        this.times[1].value = text;
      });
      this.translate.get('SEARCH.LAST_WEEK').subscribe((text: string) => {
        this.times[2].value = text;
      });
      this.translate.get('SEARCH.LAST_MONTH').subscribe((text: string) => {
        this.times[3].value = text;
      });
      this.translate.get('SEARCH.LAST_YEAR').subscribe((text: string) => {
        this.times[4].value = text;
      });
    });
  }

  ngOnInit(): void {
    this._getTopImages();
  }

  selectColor(index) {
    this.colors.forEach((color) => {
      color.isSelected = false;
    });
    if (this.selectedColorIndex === index) {
      this.selectedColorIndex = -1;
    } else {
      this.selectedColorIndex = index;
      this.colors[index].isSelected = true;
    }
  }

  selectTime(event) {
    this.selectedTimeIndex = this.times.indexOf(
      this.times.find((time) => time.value === event.target.value));
  }

  search() {
    if (this.tags === '' && this.selectedColorIndex === -1 && this.selectedTimeIndex === 0) {
      this._getTopImages();
    } else {
      this._getImagesByQuery({
        q: this.tags === undefined ? '' : this.tags,
        colorId: this.selectedColorIndex === -1 ? '' : this.selectedColorIndex + 1,
        daysPassed: this.selectedTimeIndex === 0 ? '' : this.times[this.selectedTimeIndex].key
      });
    }

  }

  private _getTopImages() {
    this.isLoading = true;
    this.apiService.getTopImages()
      .subscribe((data: Image[]) => {
        this.images = data;
        this.isLoading = false;
        this.noImages = data.length === 0;
      });
  }

  private _getImagesByQuery(params) {
    this.isLoading = true;
    this.apiService.getImagesByQuery(params)
      .subscribe((data: Image[]) => {
        this.images = data;
        this.isLoading = false;
        this.noImages = data.length === 0;
      });
  }

}
