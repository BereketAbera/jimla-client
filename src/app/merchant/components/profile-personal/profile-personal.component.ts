import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/_services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-personal',
  templateUrl: './profile-personal.component.html',
  styleUrls: ['./profile-personal.component.scss']
})
export class ProfilePersonalComponent implements OnInit {
  user;

  firstName;
  lastName;
  phoneNumber;
  username: Boolean;
  email: Boolean;
  editMode: boolean;
  userForm: FormGroup;
  value = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res: { data: any }) => {
      this.user = res.data;
      // this.count = res.data.count;
    });
  }
  get f() {
    return this.userForm.controls;
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
    this.editMode = true;
    this.resetField();

    this.value = value;

    switch (value) {
      case 'firstName':
        this.userForm = this.formBuilder.group({
          firstName: [this.user.firstName, Validators.required]
        });
        this.firstName = true;
        break;
      case 'lastName':
        this.userForm = this.formBuilder.group({
          lastName: [this.user.lastName, Validators.required]
        });
        this.lastName = true;
        break;
      case 'email':
        this.userForm = this.formBuilder.group({
          email: [this.user.email, Validators.required]
        });
        this.email = true;
        break;
      case 'phoneNumber':
        this.userForm = this.formBuilder.group({
          phoneNumber: [
            this.user.phoneNumber.slice(4),
            [Validators.required, Validators.pattern(/^[1-9]\d{8}$/)]
          ]
        });
        this.f['phoneNumber'].valueChanges
          .pipe((debounceTime(200), switchMap((term) => of(term))))
          .subscribe((res) => this.phoneNumberChange(res));
        this.phoneNumber = true;
        break;
      case 'username':
        this.userForm = this.formBuilder.group({
          username: [this.user.username, Validators.required]
        });
        this.username = true;
        break;
      default:
        console.log('No such controller exists!');
        break;
    }
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }

    let value =
      this.value == 'phoneNumber'
        ? { phoneNumber: '+251' + this.userForm.controls['phoneNumber'].value }
        : this.userForm.value;

    this.userService.updateUser(value).subscribe(
      (data) => {
        this.createMessage('success', 'Succesfully Updated');
        this.user = data;
        this.resetField();
      },
      (error) => {
        this.createMessage('error', error.error?.message || 'Failed to change');
        // this.resetField();
        // console.log(error);
      }
    );
  }

  onCancel() {
    this.editMode = false;
    (this.firstName = false),
      (this.lastName = false),
      (this.email = false),
      (this.phoneNumber = false),
      (this.username = false);
  }

  createMessage(type: string, data): void {
    this.message.create(type, data);
  }

  resetField() {
    this.phoneNumber = false;
    this.firstName = false;
    this.lastName = false;
    this.username = false;
    this.email = false;
  }
}
