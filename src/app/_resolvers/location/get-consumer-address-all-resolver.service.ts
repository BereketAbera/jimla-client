import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { LocationService } from '@app/_services/location/location.service';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetConsumerAddressAllResolverService {

  constructor(private locationService: LocationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.locationService.getAllConsumerLocations().pipe(
      mergeMap((data) => {
        // console.log(data);
        if (data) {
          return of(data);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
