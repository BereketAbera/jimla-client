import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string, returnUrl: string = '') {
    // console.log(username, password);
    return this.http
      .post<any>(`${environment.identityUrl}/auth/login`, { username, password })
      .pipe(
        map((user) => {
          // console.log(user);
          if (user && user.data && user.data.id) {
            // console.log(user);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.data));
            this.userSubject.next(user.data);
            if (returnUrl) {
              this.router.navigate([returnUrl]);
            } else {
              this.getUserUrl();
            }
          }

          return user.data;
        })
      );
  }

  getUserUrl() {
    let role =
      this.userValue.role == 'PRODUCER'
        ? 'merchant'
        : this.userValue.role == 'CONSUMER'
        ? 'retailer'
        : 'landing';
    this.router.navigate([`/${role}`]);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);

    this.router.navigate(['/landing/login']);
  }

  routeToServerError() {
    this.router.navigate(['/server_error']);
  }

  routeToNotFound() {
    this.router.navigate(['/12341234123']);
  }
}
