import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const identity = environment.identityUrl;

@Injectable({
  providedIn: 'root'
})
export class ProducerService {
  constructor(private http: HttpClient) {}

  searchProducer(obj): Observable<any> {
    let queryParams = this.generateParams(obj);
    return this.http.get(`${identity}/search/producer?${queryParams}`);
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
