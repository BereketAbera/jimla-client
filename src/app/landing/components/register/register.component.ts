import { LocationService } from '@app/_services/location/location.service';
import { BroadcastErrorService } from './../../../_services/broadcast-error.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/_services/user.service';
import { ViewportScroller } from '@angular/common';
import { of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  producerForm: FormGroup;
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
    private viewportScroller: ViewportScroller,
    private modalService: NzModalService,
    private locationService: LocationService
  ) {
    this.producerForm = this.formBuilder.group({
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
    this.broadcastErrorService.error.next(false);
    this.locationService.getLocation().subscribe(
      (position) => {
        this.controls['lat'].setValue(position.coords.longitude);
        this.controls['long'].setValue(position.coords.latitude);
      },
      (err) => {
        this.error = 'You need to enable you location and reload the page to Sign Up!';
      }
    );
    this.broadcastErrorService.error.subscribe((res) => {
      // console.log(res.error);
      if (res) {
        let errStr = '';
        if (typeof res.error.data === 'object') {
          let values = Object.values(res.error.data);
          values.map((value) => {
            errStr += `${value},`;
          });
          this.viewportScroller.scrollToAnchor('form_title');
        } else if (typeof res.error.message === 'string') {
          errStr = res.error.message;
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

  get controls() {
    return this.producerForm.controls;
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

  registerForm() {
    this.error = '';
    if (this.producerForm.invalid) {
      if (this.controls['lat'].invalid) this.error = 'You need to enable you location to Sign Up!';
      this.producerForm.markAllAsTouched();
      return;
    } else {
      // console.log('hello');
      if (this.controls['password'].value != this.controls['confirmPassword'].value) {
        this.confirmPasswordErrorText = 'Your passwords do not match';
        this.controls['confirmPassword'].setErrors({ incorrect: true });
        this.producerForm.markAllAsTouched();
        return;
      }

      if (isNaN(this.controls['tinNumber'].value)) {
        // console.log('value is not a number');
        this.controls['tinNumber'].setErrors({ incorrect: true });
        return;
      }
    }
    // console.log(this.controls, 'here');
    this.submitted = true;
    this.userService
      .addProducer({
        ...this.producerForm.value,
        phoneNumber: `+251${this.controls['phoneNumber'].value}`
      })
      .subscribe(
        (data) => {
          this.addSuccess();
          this.submitted = false;
          this.error = '';
          this.broadcastErrorService.error.next(false);
          this.router.navigate(['/landing/login']);
        },
        (error) => {
          this.error = error;
        }
      );
  }

  addSuccess() {
    this.modalService.success({
      nzTitle: 'Successfully created!!'
    });

    setTimeout(() => {
      this.modalService.closeAll();
    }, 2000);
  }
}
