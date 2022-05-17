import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { AuthInterceptors } from "./auth-interceptor"

export const HttpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptors,
    multi: true
  }
]