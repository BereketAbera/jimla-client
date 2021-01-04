import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { MessageService } from '@app/_services/message/message.service';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TotalMessagesResolverService {
  constructor(private messageService: MessageService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let page = route.queryParamMap.get('page') || 0;
    let pageSize = route.queryParamMap.get('pageSize') || 5;
    let batchId = route.queryParamMap.get('batchId') || null;
    return this.messageService.getMessage({ page, pageSize, batchId }).pipe(
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
