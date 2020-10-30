import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addProducer(user): Observable<any> {
    return this.http.post(`${this.apiUrl}/producer/singup`, user);
  }
}
