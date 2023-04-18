import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private inj: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401].includes(err.status)) {
                const authService = this.inj.get(AuthService);
                authService.logout();
            }
            return throwError(() => err);
        }))
    }
}