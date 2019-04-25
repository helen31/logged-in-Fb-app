import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getToken();
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`)
        });
        return next.handle(authReq).pipe(
            tap(
                (succ) => {
                    //console.log(succ);
                },
                (error) => {
                    if (error.status === 401) {
                        console.log('uncutigorize');
                        this.authService.logout();
                    }
                }
            )
        );
    }
}
