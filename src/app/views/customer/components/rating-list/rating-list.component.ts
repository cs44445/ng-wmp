import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/api/customer.service';
import { ratingStatus } from 'src/app/utils/status';
import * as moment from 'moment';
import { DotItem } from 'src/app/services/type/customer.type';
import { NzMessageService } from 'ng-zorro-antd/message';

interface ItemData {
  commentDetail: string,
  commentTime: string,
  nickName: string,
  ratingId: string,
  issuedDate: string,
  paymentFee: number,
  paymentStatus: string;
  ratingOperationHistoryList?: string[]
  score: number
  status: string,
  tagTexts: string,
  upsId: string,
}

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss']
})
export class RatingListComponent implements OnInit {
  @Input() ratingType = ''
  dateRange = []
  condition = {
    keyword: '',
    city: undefined,
    commentStatus: undefined,
    star: undefined
  }
  cityList = []
  commentStatusList = ratingStatus
  starList = [
    { label: '1 Star', value: 1 },
    { label: '2 Star', value: 2 },
    { label: '3 Star', value: 3 },
    { label: '4 Star', value: 4 },
    { label: '5 Star', value: 5 },
  ]
  list: ItemData[] = []
  columns = [
    {
      label: 'NO.',
      width: '60px',
      fixed: true
    },
    {
      label: 'Nickname',
      width: '100px'
    },
    {
      label: 'UPS ID',
      width: '170px'
    },
    {
      label: 'Tracking No.',
      width: '170px'
    },
    {
      label: 'Email',
      width: '130px'
    },
    {
      label: 'Phone Number',
      width: '130px'
    },
    {
      label: 'All Star Rate',
      width: '160px'
    },
    {
      label: 'Comment Details',
      width: '170px'
    },
    {
      label: 'Comment Time',
      width: '170px'
    },
    {
      label: 'Operation',
      width: '140px',
      fixed: true
    },
    {
      label: 'Operation2',
      width: '150px',
      fixed: true
    },
    {
      label: 'Status',
      width: '120px',
      fixed: true
    },
    {
      label: '',
      width: '80px',
      fixed: true
    },
  ]
  options = {
    fixed: true,
    border: false,
    multipleRowSelect: true,
    index: true,
    page_index: 1,
    page_size: 50,
    total: 0
  }
  currentRatingId = ''
  selectedRatingIds = []
  date = null
  fixedColumn = true
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  isVisible = false
  historyList: DotItem[] = []
  showComment = false
  inputValue = ''
  showError = false
  ratingId = ''
  listOfCurrentPageData: readonly ItemData[] = [];
  config = {
    page_index: 1,
    page_size: 50,
    total: 50,
  }

  constructor(
    private customerSever: CustomerService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getCities()
    this.getList()
  }

  searchByFilter(e: any) {
    this.options.page_index = 1
    this.getList()
  }

  onChange(result: any) {
  }

  sendNotification() {

  }

  currentChange(e: any) {

  }

  changeInput(page: number) {
    this.options.page_index = page
    this.getList()
  }

  getCities() {
    this.customerSever.cities({ ratingType: this.ratingType === '00' ? undefined : this.ratingType }).subscribe(res => {
      this.cityList = res.cities
    })
  }

  getList() {
    const params = {
      ratingType: this.ratingType === '00' ? undefined : this.ratingType,
      searchValue: this.condition.keyword,
      city: this.ratingType === '03' ? undefined : this.condition.city,
      status: this.condition.commentStatus,
      score: this.condition.star,
      startDate: this.dateRange && this.dateRange.length ? moment(this.dateRange[0]).format('yyyy-MM-dd') : null,
      endDate: this.dateRange && this.dateRange.length ? moment(this.dateRange[1]).format('yyyy-MM-dd') : null,
      pageNum: this.options.page_index,
      pageSize: this.options.page_size
    }
    this.customerSever.ratingList(params).subscribe(res => {
      console.log(res, 'ratingList');
      this.list = res.records
      this.options.total = res.total
    })
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.ratingId, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    // onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.ratingId));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.ratingId)) && !this.checked;
  }

  showDetail(ratingId: string) {
    console.log(ratingId, '点击展示');
    this.isVisible = true
    this.customerSever.operationHistories(ratingId).subscribe(res => {
      console.log(res, 'ddddddddd---res');
      this.historyList = res
    })

  }

  onItemChecked(id: string, checked: boolean) {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  addComment(ratingId: string) {
    this.showComment = true
    this.ratingId = ratingId
  }

  handleOk() {
    this.customerSever.ratingReplies({
      comment: this.inputValue,
      ratingId: this.ratingId
    }).subscribe(res => {
      if (!this.inputValue) {
        this.showError = true
      }
      this.message.create('success', 'Comment has been added', { nzDuration: 3000 })
      setTimeout(() => {
        this.showComment = false
      }, 1000)
    })
  }








}
