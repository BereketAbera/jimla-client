import { AuthenticationService } from '@app/_services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'merchant-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isCollapsed = true;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  collapse(): void {
    this.isCollapsed = true;
  }

  logout() {
    this.authenticationService.logout();
  }
}
