import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
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
  }
  submitForm(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password, this.returnUrl).subscribe(
      (data) => {
        this.error = data;
        // console.log(data);
      },
      (error) => {
        this.error = error;
      }
    );
  }
}
