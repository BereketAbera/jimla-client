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
    return this.orderService.getRetailerOrders({ page, pageSize }).pipe(
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
