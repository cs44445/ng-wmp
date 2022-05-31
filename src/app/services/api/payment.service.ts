import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'qs';
import { map, Observable } from 'rxjs';
import { ShipmentsParams, Status } from '../type/payment.type';
import { Base } from '../type/user.type';
import { serviceUrl } from './baseUrl'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  setParams(args: any) {
    const params = new HttpParams({ fromString: stringify(args) })
    return params
  }

  // 获得微信支付运单 (WechatPay Shipment)
  weChatPayShipment(args: ShipmentsParams): Observable<any> {
    // const params = this.setParams(args)
    const params = new HttpParams({ fromString: stringify(args) })
    return this.http
      .get<Base<Status[]>>(`${serviceUrl}shipments`, { params })
      .pipe(map(res => res.data))
  }

  // // 微信运单导出
  // exportShipment(params:any) {
  //   return 
  //   return download({
  //     url: '/service/misc-wmp-user/api/v1/exportShipment',
  //     params
  //   })
  // }

  // 获取微信支付页面搜索字典
  shipmentStatus(): Observable<any> {
    return this.http
      .get<Base<any>>(`${serviceUrl}shipments/filters`)
      .pipe(map(res => res.data))
  }
}