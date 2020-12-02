import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication.service';
import { UserService } from '@app/_services/user.service';
import { logging } from 'protractor';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService {
  constructor(private userService: UserService, private authService: AuthenticationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id;
    let currentUser = this.authService.userValue;
    if (currentUser) {
      id = currentUser.id;
    } else {
      let token = JSON.parse(localStorage.getItem('user'));
      console.log(token, 'Token');
      id=token.id;
    }

    return this.userService.getUserById(id).pipe(
      mergeMap((data) => {
        if (data) {
          return of(data);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
