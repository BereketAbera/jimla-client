import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  userForm:FormGroup;
  constructor(private formBuilder:FormBuilder) { }
  user;
  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      firstName: [this.user ? this.user.firstName : '', Validators.required],
      lastName: [this.user ? this.user.lastName : '', Validators.required],
      username: [this.user ? this.user.username : '', Validators.required],
      addressId: ["", Validators.required]
    });
  }
  get controls() {
    return this.userForm.controls;
  }

}
