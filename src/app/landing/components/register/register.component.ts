import { BroadcastErrorService } from './../../../_services/broadcast-error.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/_services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  producerForm: FormGroup;
  // producerForm: FormGroup;
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
    private broadcastErrorService: BroadcastErrorService
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
      tinNumber: ['', Validators.required],
      city: ['Addis Ababa', Validators.required],
      subCity: ['Arada'],
      woreda: [''],
      description: [''],
      lat: [8.9],
      long: [38.7]
    });
  }

  ngOnInit(): void {
    this.broadcastErrorService.error.subscribe((res) => {
      console.log(res);
    });
  }

  // submitForm() {
  //   if (!this.producerForm.valid) {
  //     return;
  //   }
  //   this.continued = true;
  // }
  getCaptcha($event) {}

  registerForm() {
    if (this.producerForm.invalid) {
      this.producerForm.markAllAsTouched();
      return;
    } else {
    }
    this.submitted = true;
    this.userService.addProducer(this.producerForm.value).subscribe(
      (data) => {
        // console.log(data);
        this.router.navigate(['/landing/login']);
      },
      (error) => console.log(error)
    );
  }
}
