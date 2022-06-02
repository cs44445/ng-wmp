import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/api/customer.service';
import { AverageScore } from 'src/app/services/type/customer.type';
const All = '00'
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  // ratingType?: string
  ratingType?: AverageScore
  rate = 0
  constructor(
    private cusHttp: CustomerService
  ) { }

  ngOnInit(): void {
    this.initRate()
  }

  initRate() {
    this.cusHttp.avgScores().subscribe(res => {
      this.rate = res
    })
  }

  changeTab(type?: string) {
    this.ratingType = { ratingType: type }
    this.cusHttp.avgScores(this.ratingType).subscribe(res => {
      this.rate = res
    })
  }
}
