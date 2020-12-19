import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '@app/_services/user.service';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffUsersResolverService {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
   
    return this.userService.getConsumerUser({page:0,pageSize:5}).pipe(
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
