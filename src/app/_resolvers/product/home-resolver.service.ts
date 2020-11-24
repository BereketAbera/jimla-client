import { CategoryListService } from './../../_services/product/category-list.service';
import { ProductService } from './../../_services/product/product.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeResolverService {
  constructor(
    private productService: ProductService,
    private categoryListService: CategoryListService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let params = { q: route.queryParamMap.get('q') || '' };
    return forkJoin(
      this.productService.getProducts(params),
      this.categoryListService.getCategories()
    ).pipe(
      mergeMap((data: any) => {
        if (data) {
          // console.log(data);
          return of(data);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
