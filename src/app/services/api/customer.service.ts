import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'qs';
import { map, Observable } from 'rxjs';
import { setParmas } from 'src/app/utils/utils';
import { AverageScore, Cities, DateType, RatingReplies, UpdateRatingStatus } from '../type/customer.type';
import { Base } from '../type/user.type';
import { customerUrl, userCustomerUrl } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  // 客户满意度 平均分
  avgScores(args?: AverageScore): Observable<number> {
    return this.http
      .get<Base<number>>(`${customerUrl}scores/average`, { params: setParmas(args) })
      .pipe(map(res => res.data))
  }

  // 客户满意度 评分
  scores(args: DateType): Observable<any> {
    return this.http
      .get<Base<any>>(`${customerUrl}scores`, { params: setParmas(args) })
      .pipe(map(res => res.data))
  }

  // 客户满意度 标签
  ratingTags(args: DateType): Observable<any> {
    return this.http
      .get<Base<any>>(`${customerUrl}rating/tags`, { params: setParmas(args) })
      .pipe(map(res => res.data))
  }

  // 获取评价列表
  ratingList(args: any): Observable<any> {
    return this.http
      .get<Base<any>>(`${userCustomerUrl}ratings`, { params: setParmas(args) })
      .pipe(map(res => res.data))
  }

  // 更细评价状态
  updateRatingStatus(args: UpdateRatingStatus): Observable<any> {
    const data = stringify(args)
    return this.http
      .post<Base<any>>(`${userCustomerUrl}rating/status`, data)
      .pipe(map(res => res.data))
  }

  // 获取筛选城市
  cities(args?: Cities): Observable<any> {
    return this.http
      .get<Base<any>>(`${userCustomerUrl}cities`, { params: setParmas(args) })
      .pipe(map(res => res.data))
  }

  // 评论回复
  ratingReplies(args: RatingReplies): Observable<any> {
    // const data = stringify(args)
    return this.http
      .post<Base<any>>(`${userCustomerUrl}rating/replies`, args)
      .pipe(map(res => res.data))
  }

  // // 最近联系人
  // getRecentRecipients(params) {
  //   return request({
  //     url: '${userCustomerUrl}notification/info',
  //     params,
  //     paramsSerializer: params => qs.stringify(params)
  //   })
  // }

  // // 发送邮件
  // notificationSend(data) {
  //   return request({
  //     url: '${userCustomerUrl}notification/send',
  //     data,
  //     method: 'POST'
  //   })
  // }

  // 获取评价的操作历史记录
  operationHistories(ratingId: string): Observable<any> {
    return this.http
      .get<Base<any>>(`${userCustomerUrl}operation/histories/${ratingId}`)
      .pipe(map(res => res.data))
  }

  // // 导出
  // ratingsExport(params) {
  //   return download({
  //     url: `${userCustomerUrl}ratings/export`,
  //     params
  //   })
  // }

  // // 获取默认微信消息模板
  // defaultMessage(params) {
  //   return request({
  //     url: `${userCustomerUrl}wechat/default/message`,
  //     params,
  //   })
  // }

  // // replyWechatMs
  // replyWechatMs(data) {
  //   return request({
  //     url: `${userCustomerUrl}wechat/message`,
  //     data,
  //     method: 'POST'
  //   })
  // }

  // // 根据评价id在线预览附件数据
  // attachmentsonlineInfo(params) {
  //   return request({
  //     url: `${userCustomerUrl}attachments/online/info`,
  //     params
  //   })
  // }
}
