import { AuthenticationService } from './../authentication.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const orderUrl = environment.orderUrl;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  getOrderGroupOrders(id): Observable<any> {
    return this.http.get(`${orderUrl}/order_groups/${id}/orders`);
  }

  getOrderData(id): Observable<any> {
    return this.http.get(`${orderUrl}/order_data/${id}`);
  }

  createVoiceOrder(order): Observable<any> {
    return this.http.post(`${orderUrl}/orders`, order);
  }

  getOrderGroups(query): Observable<any> {
    let params = this.generateParams(query);
    return this.http.get(`${orderUrl}/order_groups?${params}`);
  }

  getMerchantOrderGroups(query): Observable<any> {
    let params = this.generateParams(query);
    return this.http.get(
      `${orderUrl}/merchants/${this.authenticationService.userValue.producerId}/order_groups?${params}`
    );
  }

  getOrders(query): Observable<any> {
    let params = this.generateParams(query);
    return this.http.get(`${orderUrl}/orders?${params}`);
  }

  getMerchantOrders(query): Observable<any> {
    let params = this.generateParams(query);
    return this.http.get(
      `${orderUrl}/merchants/${this.authenticationService.userValue.producerId}/orders?${params}`
    );
  }

  getMerchantNotifications(): Observable<any> {
    let params = this.generateParams({ time: this.authenticationService.userValue.prevLoggedIn });
    return this.http.get(`${orderUrl}/notification/merchant?${params}`);
  }

  getRetailerOrderGroups(query): Observable<any> {
    let params = this.generateParams(query);
    return this.http.get(
      `${orderUrl}/retailers/${this.authenticationService.userValue.consumerId}/order_groups?${params}`
    );
  }

  getMerchantCode(company_name): Observable<any> {
    return this.http.get(`${orderUrl}/merchants/${company_name}`);
  }

  processCartOrders(orderData): Observable<any> {
    return this.http.post(`${orderUrl}/orders_cart`, orderData);
  }

  updateOrderStatus(id, order): Observable<any> {
    return this.http.put(`${orderUrl}/orders/${id}`, order);
  }

  updateOrderGroupStatus(id, order_group): Observable<any> {
    return this.http.put(`${orderUrl}/order_groups/${id}`, order_group);
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
