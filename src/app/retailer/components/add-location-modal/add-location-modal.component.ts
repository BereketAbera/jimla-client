import { LocationService } from '@app/_services/location/location.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services/authentication.service';
import { CategoryListService } from '@app/_services/product/category-list.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  editMode = false;
  location;
  locationForm: FormGroup;

  constructor(
    private modal: NzModalRef,
    private locationService: LocationService,
    private messageService: NzMessageService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
   
  }

  ngOnInit(): void {
    if (this.modal.getContentComponent().id) {
      this.location = this.modal.getContentComponent();
      this.editMode = true;
    }

    this.locationForm = this.formBuilder.group({
      phoneNumber: [this.location?this.location.phoneNumber:'', Validators.required],
      city: [this.location?this.location.city:'Addis Ababa', Validators.required],
      subCity: [this.location?this.location.subCity:'Arada'],
      woreda: [this.location?this.location.woreda:'woreda'],
      description: [this.location?this.location.description:'', Validators.required],
      lat: [this.location?this.location.lat:8.9],
      long: [this.location?this.location.long:38.7]
    });
   
    // console.log(this.editMode);
    // console.log(this.modalService);
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
      this.error = 'Some field are not valid';
    } else {
      this.loading = true;
      this.error = '';
      this.locationService.addConsumerLocation(this.locationForm.value).subscribe((res) => {
        this.loading = false;
        this.addSuccess(res);
       this.createMessage('success',"Successfully Created")

      });
    }
  }

  editLocation():void{
    if (this.locationForm.invalid) {
      this.locationForm.markAllAsTouched();
      this.error = 'Some field are not valid';
    } else {
      this.loading = true;
      this.error = '';
      this.locationService.editConsumerLocation(this.locationForm.value,this.location.id).subscribe((res) => {
        this.loading = false;
        this.addSuccess(res);
        this.createMessage('success',"Successfully Editted")
       
      });
    }
  }
  createMessage(type: string,data): void {
    this.messageService.create(type, data);
  }

  addSuccess(location) {
    this.modal.destroy({ success: true, location });
  }
}
