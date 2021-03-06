import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services/authentication.service';

@Component({
  selector: 'admin-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isCollapsed = true;
  profile: any;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  collapse(): void {
    this.isCollapsed = true;
  }

  profileOpen(): void {
    this.profile = !this.profile;
  }

  logout() {
    this.authenticationService.logout();
  }
}
