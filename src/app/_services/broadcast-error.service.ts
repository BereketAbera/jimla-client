import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastErrorService {
  public error: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor() {}
}
