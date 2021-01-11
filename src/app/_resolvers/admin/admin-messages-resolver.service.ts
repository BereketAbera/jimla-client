import { AdminService } from '@app/_services/admin/admin.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { MessageService } from '@app/_services/message/message.service';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminMessagesResolverService {
  constructor(private adminService: AdminService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let page = route.queryParamMap.get('page') || 0;
    let pageSize = route.queryParamMap.get('pageSize') || 5;
    let code = route.queryParamMap.get('code') || null;
    return this.adminService.getBatchMessage({ page, pageSize, code }).pipe(
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
