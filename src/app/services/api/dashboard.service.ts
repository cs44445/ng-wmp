import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'qs';
import { map, Observable } from 'rxjs';
import { setParmas } from 'src/app/utils/utils';
import { ActiveUserInfo, ActiveUsers, ExportArg, GlobalFilter, HitFrequency, KpiScoresArg, KpiScoresData, OperationArg, OperationLogData, RandomRatingsData, RatingsArg, RevenueArgs, RevenueFiterInfo, WechatUserInfo, WechatUsers } from '../type/dashboard.type';
import { Base } from '../type/user.type';
import { serviceUrl, kpiUrl } from './baseUrl'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  // setParams(args: any) {
  //   const params = new HttpParams({ fromString: stringify(args) })
  //   return params
  // }

  // 获取当前关注量、活跃用户数、粘性比
  operatingInfo(): Observable<ActiveUsers> {
    return this.http
      .get<Base<ActiveUsers>>(`${serviceUrl}wechat/operating/info`)
      .pipe(map(res => res.data))
  }

  // 微信运单导出
  exportKPI(args: ExportArg) {
    return this.http
      .get<Base<any>>(`${kpiUrl}api/v1/kpi/exports`, { params: setParmas(args) })
      .pipe(map(res => res))
  }

  // 统计微信用户运营数据
  wechatUsers(args: WechatUsers): Observable<WechatUserInfo[]> {
    return this.http
      .get<Base<WechatUserInfo[]>>(`${serviceUrl}statistics/wechat/users`, { params: setParmas(args) })
      .pipe(map(res => res.data))
  }

  // 统计活跃用户活跃度;统计活跃用户粘性比
  activeUsersAndStickiness(args: WechatUsers): Observable<ActiveUserInfo[]> {
    return this.http
      .get<Base<ActiveUserInfo[]>>(`${serviceUrl}statistics/activity-stickiness`, { params: setParmas(args) })
      .pipe(map(res => res.data))
  }

  // Operation Data
  operationLog(args: OperationArg): Observable<OperationLogData> {
    return this.http
      .post<Base<OperationLogData>>(`${serviceUrl}operation/log`, args)
      .pipe(map(res => res.data))
  }

  // Hit frequency
  // hitFrequency(args: Exclude<OperationArg, 'dataType'>): Observable<any> {
  hitFrequency(args: HitFrequency): Observable<any> {
    return this.http
      .post<Base<any>>(`${serviceUrl}operation/hit-frequency`, args)
      .pipe(map(res => res.data))
  }

  // Repeat shipper
  repeatShipper(args: GlobalFilter): Observable<any> {
    return this.http
      .post<Base<any>>(`${serviceUrl}operation/repeat-shipper`, args)
      .pipe(map(res => res.data))
  }

  // 查询 Revenue KPI
  kpiRevenue(args: RevenueArgs): Observable<any> {
    return this.http
      .post<Base<any>>(`${serviceUrl}revenue`, args)
      .pipe(map(res => res.data))
  }

  // 查询 Revenue 搜索框字典
  filtersRevenue(): Observable<RevenueFiterInfo> {
    return this.http
      .get<Base<RevenueFiterInfo>>(`${serviceUrl}filters/revenue`)
      .pipe(map(res => res.data))
  }

  // kpi-随机获取最优评价和最差评价
  randomRatings(args: RatingsArg): Observable<RandomRatingsData> {
    return this.http
      .get<Base<RandomRatingsData>>(`${kpiUrl}customer/satisfaction/kpi/random/ratings`, { params: setParmas(args) })
      .pipe(map(res => res.data))
  }

  // KPI-星级评分统计
  kpiScores(args: KpiScoresArg): Observable<KpiScoresData> {
    return this.http
      .get<Base<KpiScoresData>>(`/service/misc-wmp-kpi/api/v1/customer/satisfaction/kpi/city/scores-rate`, { params: setParmas(args) })
      .pipe(map(res => res.data))
  }
}










