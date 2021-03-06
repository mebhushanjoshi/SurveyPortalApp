import { LoginService } from './login.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from '@angular/core';

import { Observable } from "rxjs";

@Injectable(

)
export class AuthIntercrptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        let token = this.injector.get(LoginService).getToken();
        let newReq = req;
        if (token != null) {
            newReq = newReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        }
        return next.handle(newReq);
    }
}