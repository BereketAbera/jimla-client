import { AuthenticationService } from './../_services/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AggregatorService } from '@app/_services/aggregator.service';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RetailerDashboardResolverService {
  constructor(
    private aggregatorService: AggregatorService,
    private authenticationService: AuthenticationService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.aggregatorService
      .getConsumerDashboard(this.authenticationService.userValue.id)
      .pipe(
        mergeMap((data: any) => {
          if (data) {
            return of(data);
          } else {
            return EMPTY;
          }
        })
      );
  }
}
