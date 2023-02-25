import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { map, Observable, subscribeOn, tap } from 'rxjs';
import { User } from '../models/auth/User';
import { AuthService } from '../services/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const userCache = localStorage.getItem("user");
        if (userCache !== null) {
            const user = new User();
            Object.assign(user, JSON.parse(userCache));
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${user.accessToken}` }
            });
        }
        return next.handle(request);
    }
}