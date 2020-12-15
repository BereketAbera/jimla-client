import { LocationService } from '@app/_services/location/location.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  constructor(
    private modal: NzModalRef,
    private locationService: LocationService,
    private messageService: NzMessageService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (this.modal.getContentComponent().id) {
      this.location = this.modal.getContentComponent();
      this.editMode = true;
    }

    this.locationForm = this.formBuilder.group({
      // phoneNumber: [this.location ? this.location.phoneNumber : '', Validators.required],
      city: [this.location ? this.location.city : 'Addis Ababa', Validators.required],
      subCity: [this.location ? this.location.subCity : 'Arada'],
      woreda: [this.location ? this.location.woreda : 'woreda'],
      description: [this.location ? this.location.description : '', Validators.required],
      lat: [this.location ? this.location.lat : 8.9],
      long: [this.location ? this.location.long : 38.7]
    });
    // this.addField();
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
      let numbers = [];
      for (let i = 0; i < this.listOfControl.length; i++) {
        numbers.push({ phoneNumber: this.locationForm.get(`phoneNumber${i}`).value });
      }
      // numbers.push({phoneNumber:this.locationForm.get(`phoneNumber`).value})

      let phoneNumbers = this.locationService
        .addConsumerLocation({
          ...this.locationForm.value,
          phoneNumber: numbers[0].phoneNumber,
          phoneNumbers: numbers
        })
        .subscribe((res) => {
          this.loading = false;
          this.addSuccess(res);
          this.createMessage('success', 'Successfully Created');
        });
    }
  }

  editLocation(): void {
    if (this.locationForm.invalid) {
      this.locationForm.markAllAsTouched();
      this.error = 'Some field are not valid';
    } else {
      this.loading = true;
      this.error = '';
      let numbers = [];
      for (let i = 0; i < this.listOfControl.length; i++) {
        numbers.push({ phoneNumber: this.locationForm.get(`phoneNumber${i}`).value });
      }
      this.locationService
        .editConsumerLocation(
          { ...this.locationForm.value, phoneNumbers: numbers },
          this.location.id
        )
        .subscribe((res) => {
          this.loading = false;
          this.addSuccess(res);
          this.createMessage('success', 'Successfully Editted');
        });
    }
  }
  createMessage(type: string, data): void {
    this.messageService.create(type, data);
  }

  addSuccess(location) {
    this.modal.destroy({ success: true, location });
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id =
      this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `phoneNumber${id}`
    };
    const index = this.listOfControl.push(control);
    this.locationForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required)
    );
  }
  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 0) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      this.locationForm.removeControl(i.controlInstance);
    }
  }

  handleClose(phone) {

    this.locationService.deletePhone(phone.phoneNumber).subscribe(
      (data) => {
        this.createMessage("success","Delete Successfully")
      },
      (error) => {
        console.log(error);
        this.createMessage("error","Failed to delete")
        
      }
    );
  }
}
