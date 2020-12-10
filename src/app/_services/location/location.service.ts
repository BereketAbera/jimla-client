import { AuthenticationService } from './../authentication.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';

const identityUrl = environment.identityUrl;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  getConsumerLocation() {
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

  editConsumerLocation(location,id) {
    return this.http.put(`${identityUrl}/consumer/addresses/${id}`, location);
  }
}
