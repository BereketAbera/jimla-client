import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@app/_services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {
  consumer;
  companyForm: FormGroup;
  editMode: boolean;
  name: boolean;
  phoneNumber: boolean;
  tinNumber: boolean;

  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res: { data: any }) => {
      console.log(res);

      this.consumer = res.data;
      // this.count = res.data.count;
    });
  }

  editModeOpen(value) {
    this.editMode = true;
    this.resetField();

    switch (value) {
      case 'name':
        this.companyForm = this.formBuilder.group({
          name: [this.consumer.name, Validators.required]
        });
        this.name = true;
        break;
      case 'tinNumber':
        this.companyForm = this.formBuilder.group({
          tinNumber: [this.consumer.tinNumber, Validators.required]
        });
        this.tinNumber = true;
        break;
      case 'phoneNumber':
        this.companyForm = this.formBuilder.group({
          phoneNumber: [this.consumer.phoneNumber, Validators.required]
        });
        this.phoneNumber = true;
        break;
      default:
        console.log('No such controller exists!');
        break;
    }
  }

  createMessage(type: string,data): void {
    this.message.create(type, data);
  }

  resetField() {
    this.phoneNumber = false;
    this.tinNumber = false;
    this.name = false;
  }

  onSubmit() {
    if (!this.companyForm.valid) {
      return;
    }

    this.userService.updateConsumer({ ...this.companyForm.value, id: this.consumer.id }).subscribe(
      (data) => {
        console.log(data);
        this.createMessage('success','Succesfully Updated');
        this.consumer = data;
        this.editMode = false;
        this.resetField();
      },
      (error) => {
        this.createMessage('error',error.error?.message || "Failed to change");
        console.log(error);
      }
    );
  }

  onCancel() {
    this.editMode = false;
    (this.name = false), (this.tinNumber = false), (this.phoneNumber = false);
  }
}
