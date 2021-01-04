import { MessageService } from './../../_services/message/message.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BatchMessageResolverService {
  constructor(private messageService: MessageService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let page = route.queryParamMap.get('page') || 0;
    let pageSize = route.queryParamMap.get('pageSize') || 5;
    return this.messageService.getCompanyBatchMessage({ page, pageSize }).pipe(
      mergeMap((data: any) => {
        if (data) {
          return of(data);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
