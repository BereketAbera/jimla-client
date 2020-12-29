import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.userValue;
    // console.log(user);
    if (user) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
        // role not authorized so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      if (route.url[0].path.includes('login') || route.url[0].path.includes('register')) {
        if (user.role == 'PRODUCER') {
          this.router.navigate(['/merchant']);
        } else if (user.role == 'PRODSTAFF') {
          this.router.navigate(['/merchant']);
        } else if (user.role == 'CONSUMER') {
          this.router.navigate(['/retailer']);
        } else if (user.role == 'CONSSTAFF') {
          this.router.navigate(['/retailer']);
        } else if (user.role == 'ADMIN') {
          // console.log('routing to jm-admin');
          this.router.navigate(['/jm-admin']);
        } else {
          this.router.navigate(['/landing']);
        }
      }

      // authorized so return true
      return true;
    }

    if (
      route.url[0].path.includes('landing') ||
      route.url[0].path.includes('login') ||
      route.url[0].path.includes('register')
    ) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/landing/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
