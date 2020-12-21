import { CategoryListService } from './../_services/product/category-list.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolverService {
  constructor(private categoryListService: CategoryListService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id = route.paramMap.get('id');
    return this.categoryListService.getCategories().pipe(
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
