import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { identity, Observable } from 'rxjs';

const identityUrl = environment.identityUrl;

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  constructor(private http: HttpClient) {}

  getMerchant(company_name) {
    return this.http.get(`${identityUrl}/producer/${company_name}`);
  }
}
