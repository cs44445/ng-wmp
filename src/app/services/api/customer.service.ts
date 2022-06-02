import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { setParmas } from 'src/app/utils/utils';
import { AverageScore, DateType } from '../type/customer.type';
import { Base } from '../type/user.type';
import { customerUrl } from './baseUrl';

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
}
