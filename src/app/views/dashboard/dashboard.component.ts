import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LocalStorageService } from 'src/app/services/business/local-storage.service';
import { MessageService } from 'src/app/services/business/message.service';
import { echartsData, echartsSettings } from '../../utils/dashboard-data'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  size = 'small'
  dateBtnChecked = {
    one: false,
    three: false,
    six: false,
    customize: true,
  }
  date = null;
  pickerDate: string[] = []
  searchDate: string[] = []
  switchValue = false
  echartsData = echartsData
  echartsSettings = echartsSettings
  isCompareDisabled = false
  isLoading = false
  exportConfig = {
    show: false,
  }
  datePickerOptions = {
    disabledDate: (date: any) => new Date().getTime() < date.getTime(),
  }
  staffInfo: any


  constructor(private ls: LocalStorageService, private message: MessageService) { }

  ngOnInit(): void {
    this.countDate(11)
  }

  isGbsAdmin() {
    const { baseRole } = this.ls.get('staffInfo', '')
    return baseRole === "CS Admin";
  }

  oneClick() {
    this.dateBtnChecked.one = true;
    this.dateBtnChecked.three = false;
    this.dateBtnChecked.six = false;
    this.countDate(1);
    this.echartsData.filterOpt.isWeekly = true;
    this.message.sendMessage(this.echartsData)
    this.clearCustomize();
  }

  threeClick() {
    this.dateBtnChecked.three = true;
    this.dateBtnChecked.one = false;
    this.dateBtnChecked.six = false;
    this.echartsData.filterOpt.isWeekly = false;
    this.message.sendMessage(this.echartsData)
    this.clearCustomize();
    this.countDate(2);
  }

  sixClick() {
    console.log('six');
    this.dateBtnChecked.six = true;
    this.dateBtnChecked.three = false;
    this.dateBtnChecked.one = false;
    this.echartsData.filterOpt.isWeekly = false;
    this.message.sendMessage(this.echartsData)
    this.clearCustomize();
    this.countDate(5);
  }

  onChange(result: any) {
    // const startDate = this.pickerDate[0].split("-");
    const start = moment(result[0]).format('YYYY-MM-DD');
    const end = moment(result[1]).format('YYYY-MM-DD');
    const startDate = start.split("-");
    // ??????????????????????????????
    this.searchDate = [
      startDate[0] + "-" + startDate[1] + "-01",
      this.pickerDate[1],
    ];
    // ??????????????????????????????????????????????????????????????????
    if (this.echartsData.filterOpt.isWeekly) {
      this.searchDate = [this.pickerDate[0], this.pickerDate[1]];
    }
    this.echartsData.filterOpt.dateValue = this.searchDate;
    if (this.searchDate.length) {
      this.customizeClick('non-paramas');
    }
    // ???????????????????????????????????????????????????????????????????????????????????????
    const starY = this.searchDate[0].split("-")[0];
    const endY = this.searchDate[1].split("-")[0];
    if (endY !== starY) {
      this.isCompareDisabled = true;
      this.echartsData.filterOpt.isCompareLast = false;
    } else {
      this.isCompareDisabled = false;
    }
    this.pickerDate = [start, end]
    console.log(this.pickerDate, 'pickerDate');
    console.log(result, 'result');

  }

  customizeClick(type: string) {
    this.dateBtnChecked.customize = true;
    this.dateBtnChecked.six = false;
    this.dateBtnChecked.three = false;
    this.dateBtnChecked.one = false;
    if (type === 'customize') {
      // this.$refs["f-picker"].focus();
    }
  }

  clearCustomize() {
    this.dateBtnChecked.customize = false;
  }

  countDate(account: number) {
    const Dates = new Date();
    let Y: number | string = Dates.getFullYear();
    let M: number | string = Dates.getMonth() + 1;
    let D: number | string = Dates.getDate();
    let endY = Y;
    const endTimes =
      Y + (M < 10 ? "-0" : "-") + M + (D < 10 ? "-0" : "-") + D;
    M = M - account;
    if (M <= 0) {
      Y = Y - 1;
      M = M + 12;
    }
    if (M < 10) {
      M = "0" + M;
    }
    if (D < 10) {
      D = "0" + D;
    }

    let startTimes = Y + "-" + M + "-" + D;
    const startTimesSearch = Y + "-" + M + "-" + "01";
    if (account === 1) {
      // ?????????????????????,??????????????????

      // const days:number | string = new Date(Y, parseInt(M), 0).getDate();
      let m = Number(M)
      const days: number | string = new Date(Y, m, 0).getDate();
      // if (parseInt(D) > days) {
      if (D > days) {
        startTimes = Y + "-" + M + "-" + days;
      }
    }
    this.pickerDate = [startTimes, endTimes];
    // ??????????????????????????????
    this.searchDate = [startTimesSearch, endTimes];
    // ??????????????????????????????????????????????????????????????????
    if (this.echartsData.filterOpt.isWeekly) {
      this.searchDate = [startTimes, endTimes];
    }
    this.echartsData.filterOpt.dateValue = this.searchDate;
    // ???????????????????????????????????????????????????????????????????????????????????????
    let starY = Y;
    if (endY !== starY) {
      this.isCompareDisabled = true;
      this.echartsData.filterOpt.isCompareLast = false;
    } else if (endY === starY && endY && starY) {
      this.isCompareDisabled = false;
      this.echartsData.filterOpt.isCompareLast = false;
    } else {
      this.isCompareDisabled = true;
      this.echartsData.filterOpt.isCompareLast = false;
    }
    console.log("endY:", endY, "starY", starY);
  }
}
