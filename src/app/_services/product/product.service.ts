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

  addProduct(merchantId, product) {
    return this.http.post(`${productUrl}/product`, { ...product, merchantId });
  }

  editProduct(merchantId, product) {
    return this.http.put(`${productUrl}/product`, { ...product, merchantId });
  }

  deleteProduct(id) {
    return this.http.delete(`${productUrl}/product/${id}`);
  }

  getProduct(id): Observable<any> {
    return this.http.get(`${productUrl}/product/${id}`);
  }

  getProducts(obj): Observable<any> {
    let queryParams = this.generateParams(obj);
    return this.http.get(`${productUrl}/products/search?${queryParams}`);
  }

  getCategorySubCategories(id): Observable<any> {
    return this.http.get(`${productUrl}/products/categories/${id}/sub_categories`);
  }

  addCategorySubCategory(name, categoryId): Observable<any> {
    return this.http.post(`${productUrl}/products/categories/${categoryId}/sub_categories`, {
      name
    });
  }
  getMerchantProduct(id, obj): Observable<any> {
    let queryParams = this.generateParams(obj);
    return this.http.get(`${productUrl}/products/merchant/${id}?${queryParams}`);
  }

  getMerchantTopProduct(id): Observable<any> {
    return this.http.get(`${productUrl}/products/merchant/${id}/top`);
  }

  generateParams(params) {
    let url = '';
    let keys = Object.keys(params);
    keys.map((key) => {
      if ((key == 'status' && params[key] == '0') || params[key] == '1') {
        url = url + `${key}=${params[key]}&`;
        return;
      }
      if (params[key]) {
        url = url + `${key}=${params[key]}&`;
      }
    });

    return url.slice(0, url.length - 1);
  }
}
