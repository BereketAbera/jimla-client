import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.identityUrl;
  constructor(private http: HttpClient) {}

  addProducer(user): Observable<any> {
    console.log(user);
    return this.http.post(`${this.apiUrl}/producer/signup`, user);
  }
}
