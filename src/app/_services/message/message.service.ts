import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

const identityUrl = environment.identityUrl;
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) {}

  sendBulkMessage(obj) {
    return this.http.post(`${identityUrl}/messages`, { ...obj });
  }

  getCompanyBatchMessage(query) {
    let queryParams = this.generateParams(query);
    return this.http.get(`${identityUrl}/messages/batches?${queryParams}`);
  }

  getMessage(query) {
    let queryParams = this.generateParams(query);
    return this.http.get(`${identityUrl}/messages?${queryParams}`);
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
