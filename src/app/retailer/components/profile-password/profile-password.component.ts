import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '@app/_helpers/must-match.validator';
import { UserService } from '@app/_services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent implements OnInit {
  passForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private message: NzMessageService, private userService: UserService) {}

  ngOnInit(): void {
    this.passForm = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.min(6),
            // Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/),
            Validators.maxLength(24)
          ]
        ],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validator: MustMatch('newPassword', 'confirmPassword')
      }
    );
  }
  get f() {
    return this.passForm.controls;
  }
  onSubmit() {
    console.log(this.passForm.controls)
   

    for (const i in this.passForm.controls) {
      this.passForm.controls[i].markAsDirty();
      this.passForm.controls[i].updateValueAndValidity();
    }

     if (!this.passForm.valid) {
      return;
    }

    this.userService.changePassword(this.passForm.value).subscribe(
      (data) => {
        this.createMessage('success',"Changed Succesfully!")
      },
      (error) => {
        this.createMessage('error',"Failed To Change!")
      }
    );
  }

  createMessage(type: string,data): void {
    this.message.create(type, data);
  }

 
}
