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

  searchProducer(name): Observable<any> {
    return this.http.get(`${identity}/search/producer?name=${name}`);
  }
}
