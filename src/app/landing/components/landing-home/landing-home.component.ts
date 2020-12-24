import { AuthenticationService } from '@app/_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProducerService } from '@app/_services/identity/producer.service';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss']
})
export class LandingHomeComponent implements OnInit {
  searchField: FormControl;
  q = '';
  open = false;
  guardP =   this.authenticationService.userValue && (this.authenticationService.userValue.role == 'PRODUCER' || this.authenticationService.userValue.role == 'PRODSTAFF') ;
  guardC =   this.authenticationService.userValue && (this.authenticationService.userValue.role == 'CONSUMER' || this.authenticationService.userValue.role == 'CONSSTAFF') ;
 
  constructor(
    private router: Router,
    private producerService: ProducerService,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.searchField = new FormControl();

    this.searchField.valueChanges.subscribe((term) => {
      // this.searches.push(term);
    });
  }

  onSubmit() {
    // if (!this.searchField.value) {
    //   return;
    // }

    this.router.navigate(['/landing/home'], {
      queryParams: { q: this.searchField.value, type: 'product' }
    });
  }

  mobileDropdownOpen() {
    this.open = !this.open;
  }
}
