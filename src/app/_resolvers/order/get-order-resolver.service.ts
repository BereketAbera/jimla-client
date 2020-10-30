import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { OrderService } from '@app/_services/order/order.service';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetOrderResolverService {
  constructor(private orderService: OrderService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id = route.paramMap.get('id');
    return this.orderService.getOrderData(id).pipe(
      mergeMap((data: { order_data: any }) => {
        if (data.order_data) {
          return of(data.order_data);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
