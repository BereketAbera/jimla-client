import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AdminService } from '@app/_services/admin/admin.service';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersResolverService {
  constructor(private adminService: AdminService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let page = route.queryParamMap.get('page') || 0;
    let pageSize = route.queryParamMap.get('pageSize') || 5;
    let code = route.queryParamMap.get('code') || '';
    let type = route.queryParamMap.get('type') || '';
    let status = route.queryParamMap.get('status') || '';
    let phoneNumber = route.queryParamMap.get('phoneNumber') || '';
    let startDate = route.queryParamMap.get('startDate') || '';
    let endDate = route.queryParamMap.get('endDate') || '';
    return this.adminService
      .getOrders({ page, pageSize, code, type, status, phoneNumber, startDate, endDate })
      .pipe(
        mergeMap((data: { orders: any }) => {
          if (data.orders) {
            return of(data.orders);
          } else {
            return EMPTY;
          }
        })
      );
  }
}
