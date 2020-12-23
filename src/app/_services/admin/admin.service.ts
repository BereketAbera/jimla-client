import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const orderUrl = environment.orderUrl;
const productUrl = environment.prodUrl;
const identityUrl = environment.identityUrl;
const aggregateUrl = environment.aggregateUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getMerchants(query): Observable<any> {
    let params = this.generateParams(query);
    return this.http.get(`${identityUrl}/admin/producers?${params}`);
  }

  getMerchantAddresses(id): Observable<any> {
    return this.http.get(`${identityUrl}/admin/producers/${id}/addresses`);
  }

  getRetailers(query): Observable<any> {
    let params = this.generateParams(query);
    return this.http.get(`${identityUrl}/admin/consumers?${params}`);
  }

  getRetailerAddresses(id): Observable<any> {
    return this.http.get(`${identityUrl}/admin/consumers/${id}/addresses`);
  }

  getProducts(query): Observable<any> {
    let params = this.generateParams(query);
    return this.http.get(`${productUrl}/admin/products?${params}`);
  }

  updateMerchant(id, obj): Observable<any> {
    return this.http.put(`${identityUrl}/admin/producers/${id}`, obj);
  }

  getOrders(query): Observable<any> {
    let params = this.generateParams(query);
    return this.http.get(`${orderUrl}/admin/orders?${params}`);
  }

  getOrderGroupOrders(id): Observable<any> {
    return this.http.get(`${orderUrl}/admin/orders/${id}/orders`);
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