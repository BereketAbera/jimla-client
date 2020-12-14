import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@app/_services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

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
  addressList=[]
  constructor(
    private formBuilder: FormBuilder,
    private modal: NzModalRef,
    private messageService: NzMessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    
    this.addressList = this.modal.getContentComponent().data;
    this.userForm = this.formBuilder.group({
      phoneNumber: [this.user ? this.user.phoneNumber : '', Validators.required],
      firstName: [this.user ? this.user.firstName : '', Validators.required],
      lastName: [this.user ? this.user.lastName : '', Validators.required],
      username: [this.user ? this.user.username : '', Validators.required],
      addressId: [1, Validators.required]
    });
  }
  get controls() {
    return this.userForm.controls;
  }

  addUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.error = 'Some field are not valid';
    } else {
      this.loading = true;
      this.error = '';
      this.userService.addConsumerUser(this.userForm.value).subscribe((res) => {
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
