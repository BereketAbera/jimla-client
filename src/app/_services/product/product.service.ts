import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const productUrl = environment.prodUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProduct(id): Observable<any> {
    return this.http.get(`${productUrl}/product/${id}`);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${productUrl}/products`);
  }

  getMerchantProduct(id): Observable<any> {
    return this.http.get(`${productUrl}/products/merchant/${id}`);
  }
}
