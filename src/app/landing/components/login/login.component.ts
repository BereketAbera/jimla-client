import { BroadcastErrorService } from './../../../_services/broadcast-error.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl = '';
  error = '';
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private broadCastErrorService: BroadcastErrorService,
    private viewportScroller: ViewportScroller
  ) {}
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((res) => {
      this.returnUrl = res.get('returnUrl');
    });

    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    this.broadCastErrorService.error.subscribe((res) => {
      // console.log(res);
      if (res) {
        this.error = res.error.message;
        this.viewportScroller.scrollToAnchor('form_title');
        this.submitted = false;
      }
    });
  }
  submitForm(): void {
    this.error = '';
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    const { username, password } = this.loginForm.value;
    this.submitted = true;
    this.authService.login(username, password, this.returnUrl).subscribe(
      (data) => {
        this.error = '';
        this.broadCastErrorService.error.next(false);
        // console.log(data);
      }
      // (error) => {
      //   this.error = error;
      // }
    );
  }
}
