import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { OrderService } from '@app/_services/order/order.service';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RetailerOrderListResolverService {
  constructor(private orderService: OrderService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let page = route.queryParamMap.get('page') || 0;
    let pageSize = route.queryParamMap.get('pageSize') || 5;
    return this.orderService.getRetailerOrderGroups({ page, pageSize }).pipe(
      mergeMap((data: { order_groups: any }) => {
        // console.log(data);
        if (data.order_groups) {
          return of(data.order_groups);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
