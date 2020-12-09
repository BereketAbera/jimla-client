import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@app/_services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

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
  avatarUrl?: string="";

  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res: { data: any }) => {
      this.producer = res.data;
      // this.count = res.data.count;
    });
  }
  uploadsImg(){
    console.log("here");
    
  }
  editModeOpen(value) {
    this.editMode = true;
    this.resetField();

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
          phoneNumber: [this.producer.phoneNumber, Validators.required]
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

    this.userService.updateProducer({ ...this.companyForm.value, id: this.producer.id }).subscribe(
      (data) => {
        this.createMessage('success','Succesfully Updated');
        this.producer = data;
        this.editMode = false;
        this.resetField();
      },
      (error) => {
        this.createMessage('error',error.error?.message || "Failed to change");
      }
    );
  }

  onCancel() {
    this.editMode = false;
    (this.name = false), (this.tinNumber = false), (this.phoneNumber = false);
  }


}
