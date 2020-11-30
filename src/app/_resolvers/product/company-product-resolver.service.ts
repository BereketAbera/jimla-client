import { AggregatorService } from './../../_services/aggregator.service';
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
  constructor(private aggregatorService: AggregatorService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let company_name = route.paramMap.get('company_name');
    company_name = company_name.replace(/_/g, ' ');
    return this.aggregatorService.getCompanyPageData(company_name).pipe(
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
