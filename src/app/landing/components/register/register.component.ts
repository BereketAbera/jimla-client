import { BroadcastErrorService } from './../../../_services/broadcast-error.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/_services/user.service';
import { ViewportScroller } from '@angular/common';
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
    private viewportScroller: ViewportScroller
  ) {
    this.producerForm = this.formBuilder.group({
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
    return this.producerForm.controls;
  }

  registerForm() {
    this.error = '';
    if (this.producerForm.invalid) {
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
    this.submitted = true;
    this.userService.addProducer(this.producerForm.value).subscribe(
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
