import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@app/_services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {
  userForm;
  user;
  editMode = false;
  error: string;
  loading: boolean;
  addressList = [];
  constructor(
    private formBuilder: FormBuilder,
    private modal: NzModalRef,
    private messageService: NzMessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.addressList = this.modal.getContentComponent().data;
    this.userForm = this.formBuilder.group({
      phoneNumber: [
        this.user ? this.user.phoneNumber : '',
        [Validators.required, Validators.pattern(/^[1-9]\d{8}$/)]
      ],
      firstName: [this.user ? this.user.firstName : '', Validators.required],
      lastName: [this.user ? this.user.lastName : '', Validators.required],
      username: [this.user ? this.user.username : '', Validators.required],
      AddressId: ["", Validators.required]
    });

    this.controls['phoneNumber'].valueChanges
      .pipe((debounceTime(200), switchMap((term) => of(term))))
      .subscribe((res) => this.phoneNumberChange(res));
  }
  get controls() {
    return this.userForm.controls;
  }

  phoneNumberChange(res) {
    let phoneNumber = this.controls['phoneNumber'];
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

  addUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.error = 'Some field are not valid';
    } else {
      this.loading = true;
      this.error = '';
      this.userService
        .addConsumerUser({
          ...this.userForm.value,
          phoneNumber: '+251' + this.controls['phoneNumber'].value
        })
        .subscribe((res) => {
          this.loading = false;
          this.modal.destroy('success');
          this.createMessage('success', 'Successfully Created');
        });
    }
  }
  destroyModal(): void {
    this.modal.destroy('success');
  }
  createMessage(type: string, data): void {
    this.messageService.create(type, data);
  }
}
