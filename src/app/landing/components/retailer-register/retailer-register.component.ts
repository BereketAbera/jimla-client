import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BroadcastErrorService } from '@app/_services/broadcast-error.service';
import { UserService } from '@app/_services/user.service';
import { of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

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
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[1-9]\d{8}$/)]],
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
      lat: [null, Validators.required],
      long: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if (navigator.geolocation) {
      // console.log('getting current location');
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position);
        this.controls['lat'].setValue(position.coords.longitude);
        this.controls['long'].setValue(position.coords.latitude);
      });
    } else {
      console.log('No support for geolocation');
    }
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

    this.controls['phoneNumber'].valueChanges
      .pipe((debounceTime(200), switchMap((term) => of(term))))
      .subscribe((res) => this.phoneNumberChange(res));
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
    this.userService
      .addConsumer({
        ...this.consumerForm.value,
        phoneNumber: `+251${this.controls['phoneNumber'].value}`
      })
      .subscribe(
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
