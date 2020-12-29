import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '@app/_services/user.service';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetConsumerCategoriesResolverService {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
   
    return this.userService.getConsumerCategories().pipe(
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
