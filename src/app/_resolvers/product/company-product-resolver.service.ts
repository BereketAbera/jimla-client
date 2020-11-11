import { OrderService } from '@app/_services/order/order.service';
import { IdentityService } from './../../_services/identity/identity.service';
import { ProductService } from './../../_services/product/product.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyProductResolverService {
  constructor(
    private productService: ProductService,
    private identityService: IdentityService,
    private orderService: OrderService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let company_name = route.paramMap.get('company_name');
    return forkJoin(
      this.productService.getMerchantProduct(company_name),
      this.identityService.getMerchant(company_name),
      this.orderService.getMerchantCode(company_name)
    ).pipe(
      mergeMap((data: any) => {
        if (data) {
          return of({ products: data[0], merchant: data[1], merchantCode: data[2].merchantCode });
        } else {
          return EMPTY;
        }
      })
    );
  }
}
