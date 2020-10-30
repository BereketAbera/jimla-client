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
  userForm: FormGroup;
  producerForm: FormGroup;
  continued: boolean;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.producerForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      tinNumber: ['', Validators.required],
      city: ['', Validators.required],
      subCity: [''],
      woreda: ['']
    });
  }

  ngOnInit(): void {}

  submitForm() {
    if (!this.userForm.valid) {
      return;
    }
    this.continued = true;
  }
  getCaptcha($event) {}

  registerForm() {
    let { companyName, city, subCity, woreda, tinNumber } = this.producerForm.value;
    this.userService
      .addProducer({ ...this.userForm.value, companyName, city, subCity, woreda, tinNumber })
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        (error) => console.log(error)
      );
  }
}
