import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AdminService } from '@app/_services/admin/admin.service';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MerchantsResolverService {
  constructor(private adminService: AdminService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let page = route.queryParamMap.get('page') || 0;
    let pageSize = route.queryParamMap.get('pageSize') || 5;
    return this.adminService.getMerchants({ page, pageSize }).pipe(
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
