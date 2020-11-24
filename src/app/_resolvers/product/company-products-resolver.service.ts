import { AuthenticationService } from '@app/_services/authentication.service';
import { ProductService } from './../../_services/product/product.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AggregatorService } from '@app/_services/aggregator.service';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyProductsResolverService {
  constructor(
    private productService: ProductService,
    private authenticationService: AuthenticationService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let page = route.queryParamMap.get('page') || 0;
    let pageSize = route.queryParamMap.get('pageSize') || 5;
    return this.productService
      .getMerchantProduct(this.authenticationService.userValue.id, { page, pageSize })
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
