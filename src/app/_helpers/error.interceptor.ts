import { BroadcastErrorService } from './../_services/broadcast-error.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services/authentication.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private broadCastErrorService: BroadcastErrorService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this.authenticationService.logout();
        }

        switch (err.status) {
          case 500:
            this.authenticationService.routeToServerError();
            break;
          case 404:
            this.authenticationService.routeToNotFound();
            break;
          // case 400:
          //   this.authenticationService.routeToNotFound();
          //   break;
          case 422 || 405:
            this.broadCastErrorService.error.next(err);
            break;
          default:
            const error = err.error.message || err.statusText;
            return throwError(error);
        }
      })
    );
  }
}
