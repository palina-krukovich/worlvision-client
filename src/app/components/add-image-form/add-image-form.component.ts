import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {requiredFileType} from '../../core/tools/requiredFileType';
import {ApiService} from '../../core/service/api.service';
import {toFormData} from '../../core/tools/toFormData';
import {AuthService} from '../../core/service/auth.service';

@Component({
  selector: 'app-add-image-form',
  templateUrl: './add-image-form.component.html',
  styleUrls: ['./add-image-form.component.sass']
})
export class AddImageFormComponent implements OnInit {

  formGroup = new FormGroup({
    uid: new FormControl(this.authService.UserUid),
    image: new FormControl(null, [Validators.required, requiredFileType()])
  });
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.isLoading = true;
    this.apiService.createImage(toFormData(this.formGroup.value))
      .subscribe(event => {
        this.isLoading = false;
      });
  }

}
