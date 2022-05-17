import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler, HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from "../business/local-storage.service";

@Injectable()
export class AuthInterceptors implements HttpInterceptor {
  constructor(private router: Router, private ls: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 登录接口不需要传token
    if (req.headers.get('No-Auth') === 'true') {
      return next.handle(req)
    }
    const authToken = this.ls.get('token', '')

    const authReq = req.clone({ setHeaders: { Authorization: authToken } });

    return next.handle(authReq).pipe(
      tap(
        // 成功的回调
        () => { },
        // 失败的回调
        error => {
          if (error.status === 401) {
            localStorage.removeItem('token')
            this.router.navigate(['/login'])
          }
        }
      )
    );
  }
}
