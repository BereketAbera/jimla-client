import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

const aggregateUrl = environment.aggregateUrl;

@Injectable({
  providedIn: 'root'
})
export class AggregatorService {
  constructor(private http: HttpClient) {}

  getCompanyPageData(company_name) {
    return this.http.get(`${aggregateUrl}/get_company_data/${company_name}`);
  }

  getProducerDashboard(id){
    return this.http.get(`${aggregateUrl}/producer/dashboard/${id}`)
  }
}
