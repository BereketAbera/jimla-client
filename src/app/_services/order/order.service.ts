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
      `${orderUrl}/merchants/${this.authenticationService.userValue.id}/order_groups?${params}`
    );
  }

  // getMerchantOrderGroups(query): Observable<any> {
  //   let params = this.generateParams(query);
  //   return this.http.get(
  //     `${orderUrl}/merchants/${this.authenticationService.userValue.id}/order_groups?${params}`
  //   );
  // }

  getOrders(query): Observable<any> {
    let params = this.generateParams(query);
    return this.http.get(`${orderUrl}/orders?${params}`);
  }

  getMerchantOrders(query): Observable<any> {
    console.log(this.authenticationService.userValue);
    let params = this.generateParams(query);
    return this.http.get(
      `${orderUrl}/merchants/${this.authenticationService.userValue.id}/orders?${params}`
    );
  }

  getRetailerOrders(query): Observable<any> {
    console.log(this.authenticationService.userValue);
    let params = this.generateParams(query);
    return this.http.get(
      `${orderUrl}/retailers/${this.authenticationService.userValue.id}/orders?${params}`
    );
  }

  getMerchantCode(company_name): Observable<any> {
    return this.http.get(`${orderUrl}/merchants/${company_name}`);
  }

  processCartOrders(orderData): Observable<any> {
    return this.http.post(`${orderUrl}/orders_cart`, orderData);
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
