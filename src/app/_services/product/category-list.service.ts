import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const productUrl = environment.prodUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryListService {
  constructor(private http: HttpClient) {}

  getCategory(id): Observable<any> {
    return this.http.get(`${productUrl}/category/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${productUrl}/products/categories`);
  }
}
