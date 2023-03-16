import {
    HttpErrorResponse,
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from '../alert/service/alert.service';
import { BusyService } from '../service/busy.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(
        private readonly _busyService: BusyService,
        private readonly _alertService: AlertService
    ) { };

    public readonly intercept = (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> => {
        this._busyService.ready.next(false);
        return next.handle(request)
            .pipe(
                map((event: HttpEvent<unknown>) => {
                    if (event instanceof HttpResponse<unknown>) {
                        this._busyService.setLoading(false, request.url);
                        this._alertService.success('Request finished successfully.');
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    this._busyService.setLoading(false, request.url);
                    this._alertService.error(error.message);
                    return throwError(() => new Error(error.message));
                })
            );
    };
}