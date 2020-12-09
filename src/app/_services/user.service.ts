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
    // console.log(user);
    return this.http.post(`${this.apiUrl}/producer/signup`, user);
  }

  getUserById(id):Observable<any>{
    return this.http.get(`${this.apiUrl}/auth/user/${id}`)
  }

  changePassword(body):Observable<any>{
    return this.http.put(`${this.apiUrl}/auth/user/password`,body)
  }

  getConsumerById(id):Observable<any>{
    return this.http.get(`${this.apiUrl}/consumer/${id}`)
  }
 
  getProducerById(id):Observable<any>{
    return this.http.get(`${this.apiUrl}/producers/${id}`)
  }

  getAddressByConsId(id):Observable<any>{
    return this.http.get(`${this.apiUrl}/consumer/${id}/addresses`)
  }

  updateUser(body):Observable<any>{
    return this.http.put(`${this.apiUrl}/auth/user`,body)
  }

  updateConsumer(body):Observable<any>{
    return this.http.put(`${this.apiUrl}/consumer`,body)
  }

  updateProducer(body):Observable<any>{
    return this.http.put(`${this.apiUrl}/producer`,body)
  }

  addConsumer(user): Observable<any> {
    return this.http.post(`${this.apiUrl}/consumer/signup`, user);
  }
}
