import { AfterViewInit, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/api/dashboard.service';
import { MessageService } from 'src/app/services/business/message.service';
import { WechatUserInfo } from 'src/app/services/type/dashboard.type';
import { ThreeSeries, FourSeries } from 'src/app/services/type/echarts.type';
import { echartDataInit, echartsData, echartsSettings } from "../../../../utils/dashboard-data";
import { weekAxis } from "../../../../utils/dashboradWeekXAxis";

@Component({
  selector: 'app-wechat-users',
  templateUrl: './wechat-users.component.html',
  styleUrls: ['./wechat-users.component.scss']
})
export class WechatUsersComponent implements OnInit, OnDestroy, AfterViewInit {
  // @Input() echartsData = echartsData
  echartsData = echartsData
  @Input() echartsSettings = echartsSettings
  isLoading1 = false
  isLoading2 = false
  currentFollowers = 0
  activeUser = {
    day: 0,
    month: 0,
  }
  stickinessRate = "0%"
  isDay = true
  apiStatus = {
    one: false,
    two: false,
    three: false,
  }
  // xAxisList:string[] | number[] = []
  // xAxisList: number[] = []
  xAxisList: string[] = []
  barSeries: ThreeSeries = {
    fir: [],
    sec: [],
    thi: [],
  }
  lineSeries: FourSeries = {
    fir: [],
    sec: [],
    thi: [],
    fou: [],
  }
  isLoading = false
  initData = ['', '', '', '', '', '', '', '', '', '', '', '']
  echartDataInit = echartDataInit
  subscription?: Subscription

  constructor(private dbServe: DashboardService, private message: MessageService) { }

  ngOnInit(): void {
    this.getOperatingInfo()
    this.getDatas()
  }

  ngAfterViewInit(): void {
    this.subscription = this.message.getMessage().subscribe(res => {
      console.log(res, 'wechat-users-echart-data');
    })
  }

  getDatas() {
    // 重新调取接口，初始化所有数据
    this.echartsData.wechatUsers = JSON.parse(
      JSON.stringify(this.echartDataInit.wechatUsers)
    );
    this.getWechatUsers();
    this.getActiveUsersAndStickiness();
  }
  // 获取当前关注量、活跃用户数、粘性比
  getOperatingInfo() {
    this.dbServe.operatingInfo().subscribe(res => {
      console.log(res, '=============operatingInfo');
      let data = res || ''
      this.currentFollowers = data.currentFollowers
      this.activeUser.day = data.activeUserInfo.dayActiveUser;
      this.activeUser.month = data.activeUserInfo.monthActiveUser;
      this.stickinessRate = data.activeUserInfo.stickinessRate;
    })
  }

  // 统计微信用户运营数据
  getWechatUsers() {
    this.isLoading2 = true;
    this.dbServe.wechatUsers({
      // startDate: '2021-06-01',
      // endDate: '2022-05-19',
      // isShowWeekly: false
      startDate: this.echartsData.filterOpt.dateValue[0],
      endDate: this.echartsData.filterOpt.dateValue[1],
      isShowWeekly: this.echartsData.filterOpt.isWeekly,
    }).subscribe(res => {
      console.log(res, '=============wechatUsers');
      let data = res || "";
      if (!data) {
        this.isLoading2 = false;
        return;
      }
      // Current Follower
      this.barSeries.fir = [];
      // Unfollower
      this.lineSeries.sec = [];
      // New Follower
      this.lineSeries.thi = [];
      // Net Increase
      this.lineSeries.fou = [];
      data.forEach((val, i) => {
        this.barSeries.fir.push(val.follower.toString() || '0');
        this.lineSeries.sec.push(val.unFollower.toString() || '0');
        this.lineSeries.fou.push(val.netIncrease.toString() || '0');
      });

      // Follower
      this.lineSeries.fir = this.barSeries.fir;
      this.getXAxis(data);
      this.apiStatus.one = true;
      // 初始data数量不超过12个
      this.echartsData.wechatUsers.barOption.series.fir = [];
      this.echartsData.wechatUsers.lineOption.series.fir = [];
      this.echartsData.wechatUsers.lineOption.series.sec = [];
      this.echartsData.wechatUsers.lineOption.series.thi = [];
      this.echartsData.wechatUsers.lineOption.series.fou = [];
      for (let i = 0; i < 12; i++) {
        this.echartsData.wechatUsers.barOption.series.fir.push(
          this.barSeries.fir[i] || ""
        );
        this.echartsData.wechatUsers.lineOption.series.fir.push(
          this.lineSeries.fir[i] || ""
        );
        this.echartsData.wechatUsers.lineOption.series.sec.push(
          this.lineSeries.sec[i] || ""
        );
        this.echartsData.wechatUsers.lineOption.series.thi.push(
          this.lineSeries.thi[i] || ""
        );
        this.echartsData.wechatUsers.lineOption.series.fou.push(
          this.lineSeries.fou[i] || ""
        );
      }
      this.isLoading2 = false;
    })
  }

  getXAxis(data: WechatUserInfo[]) {
    let xAxis: string[] = [];
    this.xAxisList = [];
    data.forEach((v, j) => {
      this.xAxisList.push(v.date);
    });
    if (!this.xAxisList.length) return;
    if (
      this.echartsData.filterOpt.isWeekly ||
      this.echartsData.filterOpt.isCompareLast
    ) {
      // 周数据的话处理显示的数据格式
      this.xAxisList = weekAxis({
        arr: this.xAxisList,
        isCompareLast: this.echartsData.filterOpt.isCompareLast,
        isweek: this.echartsData.filterOpt.isWeekly
      });
      this.message.sendMessage(this.echartsData)
      console.log(this.xAxisList, 'this.xAxisList');

    }
    for (let i = 0; i < 12; i++) {
      xAxis.push(this.xAxisList[i] || "");
    }
    if (this.xAxisList.length > 12) {
      this.echartsData.wechatUsers.barOption.isPage.next = true;
      this.echartsData.wechatUsers.lineOption.isPage.next = true;
    }
    this.echartsData.wechatUsers.barOption.xAxisData = xAxis;
    this.echartsData.wechatUsers.lineOption.xAxisData = xAxis;
    this.message.sendMessage(this.echartsData)
    console.log(this.echartsData.wechatUsers.barOption.xAxisData, 'xxxxxxxxxxxxx');

  }

  // 统计活跃用户活跃度
  getActiveUsersAndStickiness() {
    this.isLoading1 = true;
    this.dbServe.activeUsersAndStickiness({
      startDate: this.echartsData.filterOpt.dateValue[0],
      endDate: this.echartsData.filterOpt.dateValue[1],
      isShowWeekly: this.echartsData.filterOpt.isWeekly,
    }).subscribe(data => {
      if (!data.length) {
        this.isLoading1 = false;
        return;
      }
      // Active User
      this.barSeries.sec = [];
      this.barSeries.thi = [];
      data.forEach((val, i) => {
        this.barSeries.sec.push(val.activeUserNumers.toString() || '0');
        const rete = val.stickinessRate.split("%")[0]
        this.barSeries.thi.push(rete || '0');
      });
      if (data.length > 12) {
        this.echartsData.wechatUsers.barOption.isPage.next = true;
        this.echartsData.wechatUsers.barOption.isPage.next = true;
      }
      this.apiStatus.two = true;
      this.apiStatus.three = true;
      // 初始data数量不超过12个
      this.echartsData.wechatUsers.barOption.series.sec = [];
      this.echartsData.wechatUsers.barOption.series.thi = [];
      for (let i = 0; i < 12; i++) {
        this.echartsData.wechatUsers.barOption.series.sec.push(
          this.barSeries.sec[i] || ""
        );
        this.echartsData.wechatUsers.barOption.series.thi.push(
          this.barSeries.thi[i] || ""
        );
      }
      this.isLoading1 = false;
    })
  }

  isDayClick() {
    this.isDay = true
  }

  isMonthClick() {
    this.isDay = false
  }

  testDbserve() {
    // this.dbServe.operatingInfo().subscribe(res => {
    //   console.log(res, '=============dbserve');

    // })


    // this.dbServe.wechatUsers({
    //   startDate: '2021-06-01',
    //   endDate: '2022-05-19',
    //   isShowWeekly: false
    // }).subscribe(res => {
    //   console.log(res, '=============dbserve');
    // })


    // this.dbServe.activeUsersAndStickiness({
    //   startDate: '2021-06-01',
    //   endDate: '2022-05-19',
    //   isShowWeekly: false
    // }).subscribe(res => {
    //   console.log(res, '=============dbserve');
    // })

    // this.dbServe.operationLog({
    //   dataType: "0",
    //   endDate: "2022-05-19",
    //   isCompareLastYear: false,
    //   isShowWeekly: false,
    //   startDate: "2021-06-01"
    // }).subscribe(res => {
    //   console.log(res, '=============dbserve');
    // })

    // this.dbServe.hitFrequency({
    //   endDate: "2022-05-19",
    //   isCompareLastYear: false,
    //   isShowWeekly: false,
    //   startDate: "2021-06-01"
    // }).subscribe(res => {
    //   console.log(res, '=============dbserve');
    // })

    // this.dbServe.filtersRevenue().subscribe(res => {
    //   console.log(res, '=============dbserve');
    // })

    // this.dbServe.kpiRevenue({
    //   accountType: 0,
    //   billTerm: 0,
    //   globalFilter: { startDate: "2021-06-01", endDate: "2022-05-19", isShowWeekly: false, isCompareLastYear: false },
    //   isShowADNNR: true,
    //   isShowADV: true,
    //   isShowNNR: true,
    //   isShowRPK: true,
    //   isShowRPP: true,
    //   isShowShipment: true,
    //   isShowUser: true,
    //   isShowVolume: true,
    //   isShowWPP: true,
    //   isShowWeight: true,
    //   serviceType: 0
    // }).subscribe(res => {
    //   console.log(res, '=============dbserve');
    // })


    // this.dbServe.randomRatings({
    //   ratingType: '01',
    //   startDate: '2021-06-01',
    //   endDate: '2022-05-19'
    // }).subscribe(res => {
    //   console.log(res, '=============dbserve');
    // })


    // this.dbServe.kpiScores({
    //   ratingType: '01',
    //   city: '',
    //   startDate: '2021-06-01',
    //   endDate: '2022-05-19'
    // }).subscribe(res => {
    //   console.log(res, '=============dbserve');
    // })

    this.dbServe.repeatShipper({
      endDate: "2022-05-19",
      isCompareLastYear: false,
      isShowWeekly: false,
      startDate: "2021-06-01",
    }).subscribe(res => {
      console.log(res, '=============dbserve');
    })



  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
