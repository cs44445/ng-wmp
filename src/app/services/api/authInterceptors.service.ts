import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler, HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorsService {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = localStorage.getItem('token')!

    /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    */
    // Clone the request and set the new header in one step.

    // const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });
    const authReq = req.clone({ setHeaders: { Authorization: authToken } });

    return next.handle(authReq)
    // send cloned request with header to the next handler.
    // return next.handle(authReq).pipe(
    //   tap(
    //     // 成功的回调
    //     () => { },
    //     // 失败的回调
    //     error => {
    //       if (error.status === 401) {
    //         localStorage.removeItem('token')
    //         this.router.navigate(['/login'])
    //       }
    //     }
    //   )
    // );
  }
}
