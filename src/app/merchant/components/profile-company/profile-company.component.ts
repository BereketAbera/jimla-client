import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BroadcastErrorService } from '@app/_services/broadcast-error.service';
import { UserService } from '@app/_services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {
  producer;
  companyForm: FormGroup;
  editMode: boolean;
  name: boolean;
  phoneNumber: boolean;
  tinNumber: boolean;
  loading = false;
  avatarUrl?: string = '';
  value = '';
  error = '';

  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private broadcastErrorService: BroadcastErrorService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res: { data: any }) => {
      this.producer = res.data;
      // this.count = res.data.count;
    });

    this.broadcastErrorService.error.subscribe((res) => {
      // console.log(res.error);
      if (res) {
        let errStr = '';
        if (typeof res.error.data === 'object') {
          let values = Object.values(res.error.data);
          values.map((value) => {
            errStr += `${value},`;
          });
        } else if (typeof res.error.message === 'string') {
          errStr = res.error.message;
        }

        this.error = errStr ? 'Validation Error: ' + errStr : '';
      }
    });
  }
  uploadsImg() {
    console.log('here');
  }

  get f() {
    return this.companyForm.controls;
  }

  phoneNumberChange(res) {
    let phoneNumber = this.f['phoneNumber'];
    let val = res;
    val = val ? val.toString() : val;

    if (val.length > 9 && val.slice(0, 4) != '+251' && val[0] != '0') {
      phoneNumber.setValue(val.slice(0, val.length - 1));
      return;
    }
    if (val && val.length >= 2) {
      if (val[0] == '0') {
        phoneNumber.setValue(val.slice(1));
      }
    }

    if (val && val.length >= 5) {
      if (val.slice(0, 4) == '+251') {
        phoneNumber.setValue(val.slice(4));
      }
    }
  }

  editModeOpen(value) {
    this.error = '';
    this.editMode = true;
    this.resetField();
    this.value = value;

    switch (value) {
      case 'name':
        this.companyForm = this.formBuilder.group({
          name: [this.producer.name, Validators.required]
        });
        this.name = true;
        break;
      case 'tinNumber':
        this.companyForm = this.formBuilder.group({
          tinNumber: [this.producer.tinNumber, Validators.required]
        });
        this.tinNumber = true;
        break;
      case 'phoneNumber':
        this.companyForm = this.formBuilder.group({
          phoneNumber: [
            this.producer.phoneNumber.slice(4),
            [Validators.required, Validators.pattern(/^[1-9]\d{8}$/)]
          ]
        });
        this.f['phoneNumber'].valueChanges
          .pipe((debounceTime(200), switchMap((term) => of(term))))
          .subscribe((res) => this.phoneNumberChange(res));
        this.phoneNumber = true;
        break;
      default:
        console.log('No such controller exists!');
        break;
    }
  }

  createMessage(type: string, data): void {
    this.message.create(type, data);
  }

  resetField() {
    this.phoneNumber = false;
    this.tinNumber = false;
    this.name = false;
  }

  onSubmit() {
    this.error = '';
    if (!this.companyForm.valid) {
      return;
    }

    let value =
      this.value == 'phoneNumber'
        ? { phoneNumber: '+251' + this.companyForm.controls['phoneNumber'].value }
        : this.companyForm.value;

    this.userService.updateProducer({ ...value, id: this.producer.id }).subscribe(
      (data) => {
        this.createMessage('success', 'Successfully Updated');
        this.producer = data;
        this.editMode = false;
        this.resetField();
      },
      (error) => {
        this.createMessage('error', error.error?.message || 'Failed to change');
      }
    );
  }

  onCancel() {
    this.editMode = false;
    (this.name = false), (this.tinNumber = false), (this.phoneNumber = false);
  }
}
