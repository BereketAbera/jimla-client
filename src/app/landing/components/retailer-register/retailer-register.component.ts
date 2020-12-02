import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BroadcastErrorService } from '@app/_services/broadcast-error.service';
import { UserService } from '@app/_services/user.service';

@Component({
  selector: 'app-retailer-register',
  templateUrl: './retailer-register.component.html',
  styleUrls: ['./retailer-register.component.scss']
})
export class RetailerRegisterComponent implements OnInit {
  consumerForm: FormGroup;
  continued: boolean;
  passwordVisible = false;
  password?: string;
  confirmPasswordErrorText = 'Confirm password is required';
  error = '';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private broadcastErrorService: BroadcastErrorService,
    private viewportScroller: ViewportScroller
  ) {
    this.consumerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      companyName: ['', Validators.required],
      tinNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      city: ['Addis Ababa', Validators.required],
      subCity: ['Arada'],
      woreda: ['woreda'],
      description: [''],
      lat: [8.9],
      long: [38.7]
    });
  }

  ngOnInit(): void {
    this.broadcastErrorService.error.subscribe((res) => {
      if (res) {
        let errStr = '';
        if (typeof res.error.data === 'object') {
          let values = Object.values(res.error.data);
          values.map((value) => {
            errStr += `${value},`;
          });
          this.viewportScroller.scrollToAnchor('form_title');
        }
        this.error = errStr ? 'Validation Error: ' + errStr : '';
        this.submitted = false;
      }
    });
  }

  get controls() {
    return this.consumerForm.controls;
  }

  registerForm() {
    this.error = '';
    if (this.consumerForm.invalid) {
      this.consumerForm.markAllAsTouched();
      return;
    } else {
      // console.log('hello');
      if (this.controls['password'].value != this.controls['confirmPassword'].value) {
        // console.log('hello again');
        this.confirmPasswordErrorText = 'Your passwords do not match';
        this.controls['confirmPassword'].setErrors({ incorrect: true });
        this.consumerForm.markAllAsTouched();
        return;
      }

      if (isNaN(this.controls['tinNumber'].value)) {
        // console.log('value is not a number');
        this.controls['tinNumber'].setErrors({ incorrect: true });
        return;
      }
    }
    this.submitted = true;
    this.userService.addConsumer(this.consumerForm.value).subscribe(
      (data) => {
        this.submitted = false;
        this.error = '';
        this.broadcastErrorService.error.next(false);
        this.router.navigate(['/landing/login']);
      },
      (error) => console.log(error)
    );
  }
}
