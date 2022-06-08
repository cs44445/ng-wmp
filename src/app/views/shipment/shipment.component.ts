import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Logger } from '@azure/msal-browser';
import { PaymentService } from 'src/app/services/api/payment.service';
import * as moment from 'moment';
import { PayStatusOPtionsItem, StatusItem, Condition } from 'src/app/services/type/payment.type';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin } from 'rxjs';
interface ItemData {
  id: number;
  trackingNo: string,
  nickname: string,
  upsId: string,
  issuedDate: string,
  paymentFee: number,
  paymentStatus: string;
}

interface DataItem {
  trackingNo: string,
  nickname: string,
  upsId: string,
  issuedDate: string,
  paymentFee: number,
  paymentStatus: string
}
@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss']
})
export class ShipmentComponent implements OnInit {
  // datePickerOptions={
  //   disabledDate: date => new Date().getTime() < date.getTime()
  // }
  readonly Year_Time_Stamp = 1000 * 60 * 60 * 24 * 365
  condition: Condition = {
    searchTerm: '',
    paymentStatus: '',
    date: [new Date(new Date().getTime() - this.Year_Time_Stamp), new Date()]
  }
  paySuccessOPtions = [
    { label: '是', value: true },
    { label: '否', value: false }
  ]
  payStatusOPtions: PayStatusOPtionsItem[] = []
  columns = [
    {
      label: 'No.',
    },
    {
      label: 'Tracking No.',
      prop: 'trackingNo',
      width: 170,
    },
    {
      label: 'Nickname',
      prop: 'nickname'
    },
    {
      label: 'UPS ID',
      prop: 'upsId'
    },
    {
      label: 'Transaction Date',
      prop: 'issuedDate',
    },
    {
      label: 'Actual Payment Amount',
      prop: 'paymentFee',
    },
    {
      label: 'Payment Stauts',
      prop: 'paymentStatus',
      width: 140
    },
    {
      label: 'Operation',
      overflowTooltip: false,
      width: 240,
    }
  ]
  options = {
    border: true,
    multipleRowSelect: true,
    index: true,
    page_index: 1,
    page_size: 50,
    total: 50,
    // currentChange: this.currentChange(),
    currentChange: null,
    // selectionChange: this.selectionChange(),
    selectionChange: null,
  }
  headHeight = 167
  selectedTrackingNos: any[] = []
  date = null
  listOfData: ItemData[] = []
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  setOfCheckedId = new Set<string>();
  fixedColumn = false
  isVisible = false
  dataItem: any
  test = false
  config = {
    page_index: 1,
    page_size: 50,
    total: 50,
  }


  constructor(
    private payServe: PaymentService,
    private message: NzMessageService,
    private cdr: ChangeDetectorRef,
  ) {

  }

  updateData(): void {
    const id = this.message.loading('').messageId;
    const data = {
      ...this.condition,
      fromDate: this.condition.date && this.condition.date.length ? moment(this.condition.date[0]).format('YYYY-MM-DD') : undefined,
      toDate: this.condition.date && this.condition.date.length ? moment(this.condition.date[1]).format('YYYY-MM-DD') : undefined,
      pageNum: this.options.page_index,
      pageSize: this.options.page_size
    }
    // 删除this.condition中的date参数
    delete data['date']
    forkJoin([
      this.payServe.shipmentStatus(),
      this.payServe.weChatPayShipment(data)
    ]).subscribe(([shipmentStatusRes, weChatPayShipmentRes]) => {
      this.message.remove(id)
      // 处理statusList
      this.payStatusOPtions = shipmentStatusRes.Status.map((v: StatusItem) => ({
        label: v.description,
        value: v.value
      }))

      // 处理paymentList
      this.listOfData = weChatPayShipmentRes.records
      // Object.assign({}, this.defaultConfig, this.options)
      // this.options.total = parseInt(res.total)
      this.config.total = parseInt(weChatPayShipmentRes.total)
      console.log(this.config, ' fathter this.config');
      this.cdr.markForCheck()
    })
  }

  ngOnInit(): void {
    this.updateData()
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();

    // 点击勾选添加到数组
    const listItem = this.listOfCurrentPageData.filter(item => item.trackingNo === id)
    if (this.selectedTrackingNos.includes(listItem)) return
    if (checked) {
      this.selectedTrackingNos.push(...listItem)
    } else {
      const index = this.selectedTrackingNos.findIndex(item => item.trackingNo === id)
      this.selectedTrackingNos.splice(index, 1)
    }
    console.log(this.listOfCurrentPageData, 'single');
    console.log(this.selectedTrackingNos, 'this.selectedTrackingNos');
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.trackingNo, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.trackingNo));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.trackingNo)) && !this.checked;
  }


  searchByFilter(e: any) {
    this.options.page_index = 1
    console.log(e, 'searchByFilter');

    this.getList()
  }

  createBasicMessage(): void {
    const id = this.message.loading('is loading', { nzDuration: 0 }).messageId;
    setTimeout(() => {
      this.message.remove(id);
    }, 2500);
  }

  getList() {
    const id = this.message.loading('').messageId;
    const data = {
      ...this.condition,
      fromDate: this.condition.date && this.condition.date.length ? moment(this.condition.date[0]).format('YYYY-MM-DD') : undefined,
      toDate: this.condition.date && this.condition.date.length ? moment(this.condition.date[1]).format('YYYY-MM-DD') : undefined,
      pageNum: this.options.page_index,
      pageSize: this.options.page_size
    }
    // 删除this.condition中的date参数
    delete data['date']

    this.payServe.weChatPayShipment(data).subscribe(res => {
      this.message.remove(id);
      this.listOfData = res.records
      // Object.assign({}, this.defaultConfig, this.options)
      // this.options.total = parseInt(res.total)

      this.config.total = parseInt(res.total)
      console.log(this.config, ' fathter this.config');
      this.cdr.markForCheck()
    })
  }

  currentChange(page: number) {
    this.options.page_index = page
    this.getList()
  }

  onChange(date: string) {
    console.log(this.condition.date[0], 'this.condition.date[0]');
    console.log(this.condition.date[1], 'this.condition.date[1]');
  }

  showDetail(data: any) {
    this.isVisible = true
    this.dataItem = data
  }

  refoundData(str: string) {
    return str.slice(0, 10)
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  // 导出
  export() {
    if (!this.selectedTrackingNos.length) {
      this.createMessage('error')
    }
  }

  createMessage(type: string): void {
    this.message.create(type, 'No data selected', { nzDuration: 2000 })
    return
  }



  // exportList() {
  //   if (!this.selectedTrackingNos.length) {
  //     message({ type: 'error', message: 'No data selected' })
  //     return
  //   }
  //   this.isLoading = true
  //   const params = {
  //     trackingNos: this.selectedTrackingNos.join(',')
  //   }
  //   exportShipment(params).then(() => {
  //     this.isLoading = false
  //   }).catch(() => {
  //     this.isLoading = false
  //   })
  // }

}
