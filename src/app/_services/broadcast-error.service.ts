import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastErrorService {
  public error: BehaviorSubject<any>;

  constructor() {}

  // broadCastError(err) {
  //   this.error.next(err);
  // }

  // get errorValue() {
  //   return this.error;
  // }
}
