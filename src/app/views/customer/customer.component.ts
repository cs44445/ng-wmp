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
  // ratingType!: AverageScore
  ratingType = All
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
    this.cusHttp.avgScores({ ratingType: type }).subscribe(res => {
      this.rate = res
    })
  }
}
