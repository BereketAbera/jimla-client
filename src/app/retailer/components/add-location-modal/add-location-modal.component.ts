import { LocationService } from '@app/_services/location/location.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services/authentication.service';
import { CategoryListService } from '@app/_services/product/category-list.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-location-modal',
  templateUrl: './add-location-modal.component.html',
  styleUrls: ['./add-location-modal.component.scss']
})
export class AddLocationModalComponent implements OnInit {
  error = '';
  loading = false;
  categories = [];
  subCategories = [];

  locationForm: FormGroup;

  constructor(
    private modal: NzModalRef,
    private locationService: LocationService,
    private modalService: NzModalService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.locationForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      city: ['Addis Ababa', Validators.required],
      subCity: ['Arada'],
      woreda: ['woreda'],
      description: ['', Validators.required],
      lat: [8.9],
      long: [38.7]
    });
  }

  get controls() {
    return this.locationForm.controls;
  }

  destroyModal(): void {
    this.modal.destroy('success');
  }

  addLocation(): void {
    if (this.locationForm.invalid) {
      this.locationForm.markAllAsTouched();
      this.error = 'Some filed are not valid';
    } else {
      this.loading = true;
      this.error = '';
      this.locationService.addConsumerLocation(this.locationForm.value).subscribe((res) => {
        this.loading = false;
        this.addSuccess(res);
      });
    }
  }

  addSuccess(location) {
    this.modal.destroy({ success: true, location });
    this.modalService.success({
      nzTitle: 'Successfully created!!',
      nzStyle: { bottom: '20px' }
    });

    setTimeout(() => {
      this.modalService.closeAll();
    }, 2000);
  }
}
