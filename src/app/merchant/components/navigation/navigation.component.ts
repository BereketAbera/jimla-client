import { OrderService } from '@app/_services/order/order.service';
import { AuthenticationService } from '@app/_services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'merchant-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isCollapsed = true;
  profile: any;

  badgeStyle = {
    backgroundColor: '#102430',
    marginRight: '1rem'
  };
  notifications: any = {};

  constructor(
    private authenticationService: AuthenticationService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.getMerchantNotifications().subscribe((res) => {
      this.notifications = res;
    });
  }

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
    this.profile = false;
  }
}
