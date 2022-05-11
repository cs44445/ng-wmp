import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'qs';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AzuretokenInfo, Base, Email } from '../type/user.type';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/x-www-form-urlencoded',
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseUrl = environment.VUE_APP_BASE_API
  readonly authUrl = `${this.baseUrl}/service/misc-wmp-auth`
  constructor(private http: HttpClient) { }

  // 获取用户信息
  staffInfo(): Observable<any> {
    return this.http
      .get<Base<any>>(`${this.baseUrl}/service/misc-wmp-user/api/v1/staff/profile`)
  }

  // 重定向获取用户信息及token
  getInfo(azureParams: AzuretokenInfo): Observable<any> {
    const azureInfo = stringify(azureParams)
    return this.http
      .post<Base<any>>(`${this.authUrl}/oauth2/token/azure`, azureInfo, httpOptions)
      .pipe(map(res => res.data))
  }

  // 开发测试登录获取token
  getToken(params: Email): Observable<any> {
    const email = stringify(params)
    return this.http
      .post<Base<any>>(`${this.authUrl}/oauth2/token/temporary-test`, email, httpOptions)
      .pipe(map(res => res.data))
  }
}

