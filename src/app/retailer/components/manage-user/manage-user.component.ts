import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@app/_services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  userForm: FormGroup;
  addressList;
  isLoading;
  error: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService:NzMessageService,
  ) {
    this.route.data.subscribe((res) => {
      console.log(res);

      this.addressList = res.addData;
      this.user = res.userData;
    });
  }
  user;
  phoneForm;
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: [this.user ? this.user.firstName : '', Validators.required],
      lastName: [this.user ? this.user.lastName : '', Validators.required],
      email: [this.user ? this.user.email : '', Validators.required]
      // addressId: [this.user.AddressId ? this.user.AddressId:1, Validators.required]
    });

    this.phoneForm = this.formBuilder.group({
      phoneNumber: [this.user ? this.user.phoneNumber : '', Validators.required]
    });

  }
  get controls() {
    return this.userForm.controls;
  }

  get phonecontrols() {
    return this.phoneForm.controls;
  }
  createMessage(type: string, data): void {
    this.messageService.create(type, data);
  }
  saveChanges() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.error = 'Some field are not valid';
      return;
    }
    this.isLoading = true;

    this.userService.updateUser({ ...this.userForm.value, id: this.user.id }).subscribe(
      (data) => {
        console.log(data);
        this.isLoading=false;
        this.createMessage('success','Succesfully Editted')
      },
      (error) => {
        console.log(error);
        this.createMessage('error','Failed to Update')
      }
    );
  }
}
