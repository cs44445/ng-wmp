import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CustomerService } from 'src/app/services/api/customer.service';
import { DateType } from 'src/app/services/type/customer.type';

@Component({
  selector: 'app-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.scss']
})
export class StarRateComponent implements OnInit {
  radioValue = '01';
  options = [
    { label: 'Last 7 Days', value: '01' },
    { label: 'Last 15 Days', value: '02' },
    { label: 'Last 30 Days', value: '03' },
    { label: 'Last 3 Months', value: '04' },
    { label: 'Last 6 Months', value: '05' }
  ];
  dateType: DateType = { dateType: '01' }
  headerList: any[] = []
  selectedTagCategory = ''

  constructor(private cusServe: CustomerService) { }

  ngOnInit(): void {
    this.getData()
  }

  changeRadio(type: string) {
    this.dateType = { dateType: type }
    this.getData()
  }

  getData() {
    forkJoin([
      this.cusServe.scores(this.dateType),
      this.cusServe.ratingTags(this.dateType)
    ]).subscribe(([scoreInfo, ratingInfo]) => {
      this.headerList = ratingInfo

    })
  }
}
