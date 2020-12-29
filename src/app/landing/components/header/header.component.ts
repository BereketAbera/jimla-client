import { AuthenticationService } from '@app/_services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'landing-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  open = false;
  guardP =   this.authenticationService.userValue && (this.authenticationService.userValue.role == 'PRODUCER' || this.authenticationService.userValue.role == 'PRODSTAFF') ;
  guardC =   this.authenticationService.userValue && (this.authenticationService.userValue.role == 'CONSUMER' || this.authenticationService.userValue.role == 'CONSSTAFF') ;
  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.userValue;
  }

  mobileDropdownOpen() {
    this.open = !this.open;
  }
}
