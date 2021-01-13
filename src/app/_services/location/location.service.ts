import { AuthenticationService } from './../authentication.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const identityUrl = environment.identityUrl;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  getConsumerLocation(query) {
    let params = this.generateParams(query);
    return this.http.get(
      `${identityUrl}/consumer/${this.authenticationService.userValue.consumerId}/addresses?${params}`
    );
  }

  getAllConsumerLocations() {
    return this.http.get(
      `${identityUrl}/consumer/${this.authenticationService.userValue.consumerId}/addresses`
    );
  }

  addConsumerLocation(location) {
    return this.http.post(
      `${identityUrl}/consumer/${this.authenticationService.userValue.consumerId}/addresses`,
      location
    );
  }

  editConsumerLocation(location, id) {
    return this.http.put(`${identityUrl}/consumer/addresses/${id}`, location);
  }

  deletePhone(id) {
    return this.http.delete(`${identityUrl}/consumer/addresses/phone/${id}`);
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

  getLocation(): Observable<any> {
    return Observable.create((observer) => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => observer.error(error)
        );
      } else {
        observer.error('Unsupported Browser');
      }
    });
  }
}
