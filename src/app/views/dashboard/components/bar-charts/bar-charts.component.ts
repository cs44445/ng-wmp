import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { echartsData, echartsSettings } from '../../../../utils/dashboard-data'
import { v1 as uuidv1 } from "uuid"
// import * as echarts from "echarts/lib/echarts";
import * as echarts from 'echarts';
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import { BarOption } from 'src/app/services/type/echarts.type';
import { MessageService } from 'src/app/services/business/message.service';
import { Subscription } from 'rxjs';
import { EChartsOption } from 'echarts';

import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
interface OptinType {
  tooltip: any,
  legend: any,
  grid: any,
  xAxis: any,
  yAxis: any,
  series?: any
}
interface ModuleObj {
  type: string,
  index: number
}

@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.scss']
})
export class BarChartsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() echartsSettings = echartsSettings
  // @Input() echartsData = echartsData
  echartsData = echartsData
  @Input() whatModule = ''
  @Input() selectWord = {
    nnr: false,
    volume: false,
    account: false,
  }
  @Output() chartsXAxis = new EventEmitter<ModuleObj>()
  elId = ""
  // option = {}
  // option?: BarOption
  option?: any
  // myChart = EChartsType
  myChart: any
  isPage = {
    previous: false,
    next: false
  }
  chartsHeight?: Number
  isNoRate = ['VolumeRevenue5', 'VolumeRevenue6', 'VolumeRevenue7', 'VolumeRevenue8', 'VolumeRevenue9']
  isAmount = ['VolumeRevenue1', 'VolumeRevenue5', 'VolumeRevenue6', 'VolumeRevenue8'] //显示美元符号
  subscription?: Subscription

  constructor(private messgae: MessageService) { }

  ngOnInit(): void {
    this.elId = uuidv1(); //获取随机id
    window.addEventListener("resize", this.resizeHandle);
    this.subscription = this.messgae.getMessage().subscribe(msg => {
      console.log(msg, 'bar-chart');
      this.echartsData = msg
    })


    // this.testDefault()
  }

  ngAfterViewInit(): void {
    this.myEcharts();
    // console.log(this.echartsData, 'this.echartsData----bar-----ngAfterViewInit');
    // console.log(this.myChart,'myChart========');

  }

  leftClick() {
    if (!this.isPage.previous) return
    const emitObj: ModuleObj = { type: this.whatModule + " bar", index: 0 }
    // this.$emit("chartsXAxis", this.whatModule + " bar", 0);
    this.chartsXAxis.emit(emitObj)
  }
  rightClick() {
    if (!this.isPage.next) return
    const emitObj: ModuleObj = { type: this.whatModule + " bar", index: 1 }
    // this.$emit("chartsXAxis", this.whatModule + " bar", 1);
    this.chartsXAxis.emit(emitObj)
  }

  resizeHandle() {
    this.myChart.resize();
  }

  myEcharts() {
    // 全局配置
    const xAxis = this.echartsSettings.xAxis;
    const yAxis = this.echartsSettings.yAxis;
    const series = this.echartsSettings.series;
    const grid = this.echartsSettings.grid;
    // 模块配置
    // 对比去年时获取今年和去年年份
    // let thisYear = "";
    let thisYear = 0;
    let lastYear = "";

    // 写死的数据
    let dateValue2 = ["2021-06-01", "2022-05-23"]
    // const dateValue = this.echartsData.filterOpt.dateValue;
    // const ty = dateValue[1].split("-");
    const ty = dateValue2[1].split("-");
    // thisYear = ty[0];
    thisYear = parseInt(ty[0]);
    lastYear = (thisYear - 1).toString();


    if (this.whatModule === "WechatUsers") {
      this.option = this.echartsData.wechatUsers.barOption;
      console.log(this.option, '========this.option');

      this.isPage = this.option.isPage;
    }
    if (this.whatModule === "OperationData") {
      this.option = this.echartsData.operationData.barOption;
      this.isPage = this.option.isPage;
      // 对比去年与无对比去年时legend显示
      if (this.echartsData.filterOpt.isCompareLast) {
        this.option.legend.data = [
          lastYear,
          // thisYear,
          thisYear.toString(),
          "Success Rate " + lastYear,
          "Success Rate " + thisYear,
        ];
      } else {
        this.option.legend.data = [
          "Number",
          "NumberLastYear",
          "Success Rate",
          "RateLastYear",
        ];
      }
    }
    if (this.whatModule.indexOf("VolumeRevenue") > -1) {
      const modules = this.whatModule.split("VolumeRevenue");
      const mo = modules[1]
      this.option = this.echartsData.volumeRevenue.barOption[mo as any];
      this.isPage = this.option!.isPage;
      if (
        this.isNoRate.includes(this.whatModule) &&
        this.echartsData.filterOpt.isCompareLast
      ) {
        // this.option.legend.data = [lastYear, thisYear];
        this.option!.legend.data = [lastYear, thisYear.toString()];
      }
    }
    if (this.whatModule === "RepeatAccountshipper") {
      this.option = this.echartsData.repeatAccountShipper.barOption;
      this.isPage = this.option.isPage;
      // 对比去年与无对比去年时legend显示
      if (this.echartsData.filterOpt.isCompareLast) {
        this.option.legend.data = [
          lastYear,
          thisYear.toString(),
          lastYear + " % of Total",
          thisYear + " % of Total",
        ];
      } else {
        this.option.legend.data = [
          "Number",
          "NumberLastYear",
          "Rate",
          "RateLastYear",
        ];
        if (this.selectWord.nnr) {
          this.option.legend.data = [
            "Amount",
            "AmountLastYear",
            "Rate",
            "RateLastYear",
          ];
        }
      }
    }

    // 配置图表
    const option: OptinType = {
      // 提示框组件
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          crossStyle: {
            color: "#999",
          },
        },
        formatter: (params: any) => {
          console.log("params:==================", params);
          // 自定义鼠标划上显示
          const item0 = params[0] || 0;
          const item1 = params[1] || 0;
          const item2 = params[2] || 0;
          const item3 = params[3] || 0;
          if (this.whatModule === "WechatUsers") {
            if (item0.name) {
              return `<div>
                <div>${params && params[0].name}</div>
                ${params
                  .map(
                    (item: any) =>
                      `<div style="display: flex;justify-content: space-between;">
                  <div>${item.seriesType === "line"
                        ? item.marker
                        : '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:' +
                        item.color +
                        '"></span>'
                      }${item.seriesName}</div>
                  <div style="margin-left:50px;">${Number(
                        item.data
                      ).toLocaleString()}${item.seriesType === "line" ? "%" : ""
                      }</div>
                </div>`
                  )
                  .join("")}
              </div>`;
            }
            return;
          }
          if (
            !this.echartsData.filterOpt.isCompareLast &&
            !this.echartsData.filterOpt.isWeekly
          ) {
            // volume选择revenue，rpp，rpk和adnnr时显示$符号
            if (this.whatModule === "VolumeRevenue1") {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map(
                      (item: any) =>
                        `<div style="display: flex;justify-content: space-between;">
                    <div>${item.seriesType === "line"
                          ? item.marker
                          : '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:' +
                          item.color +
                          '"></span>'
                        }${item.seriesType === "line" ? "MoM" : item.seriesName
                        }</div>
                    <div style="margin-left:50px;">${item.seriesType === "bar" ? "$" : ""
                        }${Number(item.data).toLocaleString()}${item.seriesType === "line" ? "%" : ""
                        }</div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
              return;
            }
            if (
              this.whatModule === "VolumeRevenue5" ||
              this.whatModule === "VolumeRevenue6" ||
              this.whatModule === "VolumeRevenue8"
            ) {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map((item: any) =>
                      item.seriesType === "line"
                        ? ""
                        : `<div style="display: flex;justify-content: space-between;">
                    <div><span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:${item.color
                        }"></span>
                     ${item.seriesName}</div>
                    <div style="margin-left:50px;">$${Number(
                          item.data
                        ).toLocaleString()}</div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
              return false;
            }
            if (
              this.whatModule === "VolumeRevenue7" ||
              this.whatModule === "VolumeRevenue9"
            ) {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map((item: any) =>
                      item.seriesType === "line"
                        ? ""
                        : `<div style="display: flex;justify-content: space-between;">
                    <div><span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:${item.color
                        }"></span>
                     ${item.seriesName}</div>
                    <div style="margin-left:50px;">${Number(
                          item.data
                        ).toLocaleString()}</div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
              return;
            }
            if (
              this.whatModule === "VolumeRevenue0" ||
              this.whatModule === "VolumeRevenue2" ||
              this.whatModule === "VolumeRevenue3" ||
              this.whatModule === "VolumeRevenue4"
            ) {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map(
                      (item: any) =>
                        `<div style="display: flex;justify-content: space-between;">
                    <div>${item.seriesType === "line"
                          ? item.marker
                          : '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:' +
                          item.color +
                          '"></span>'
                        }${item.seriesType === "line" ? "MoM" : item.seriesName
                        }</div>
                    <div style="margin-left:50px;">${Number(
                          item.data
                        ).toLocaleString()}${item.seriesType === "line" ? "%" : ""
                        }</div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
              return;
            }
            if (
              this.whatModule === "OperationData" ||
              this.whatModule === "RepeatAccountshipper"
            ) {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map(
                      (item: any) =>
                        `<div style="display: flex;justify-content: space-between;">
                    <div>${item.seriesType === "line"
                          ? item.marker
                          : '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:' +
                          item.color +
                          '"></span>'
                        }${item.seriesName}</div>
                    <div style="margin-left:50px;">
                    ${this.whatModule === "RepeatAccountshipper" &&
                          this.selectWord.nnr &&
                          item.seriesType === "bar"
                          ? "$"
                          : ""
                        }${Number(item.data).toLocaleString()}${item.seriesType === "line" ? "%" : ""
                        }
                    </div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
            }
            return;
          }
          if (
            !this.echartsData.filterOpt.isCompareLast &&
            this.echartsData.filterOpt.isWeekly
          ) {
            // volume选择revenue，rpp，rpk和adnnr时显示$符号
            if (this.whatModule === "VolumeRevenue1") {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map(
                      (item: any) =>
                        `<div style="display: flex;justify-content: space-between;">
                    <div>${item.seriesType === "line"
                          ? item.marker
                          : '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:' +
                          item.color +
                          '"></span>'
                        }${item.seriesType === "line" ? "WoW" : item.seriesName
                        }</div>
                    <div style="margin-left:50px;">${item.seriesType === "bar" ? "$" : ""
                        }${Number(item.data).toLocaleString()}${item.seriesType === "line" ? "%" : ""
                        }</div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
              return;
            }
            if (
              this.whatModule === "VolumeRevenue5" ||
              this.whatModule === "VolumeRevenue6" ||
              this.whatModule === "VolumeRevenue8"
            ) {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map((item: any) =>
                      item.seriesType === "line"
                        ? ""
                        : `<div style="display: flex;justify-content: space-between;">
                    <div><span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:${item.color
                        }"></span>
                     ${item.seriesName}</div>
                    <div style="margin-left:50px;">$${Number(
                          item.data
                        ).toLocaleString()}</div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
              return;
            }
            if (
              this.whatModule === "VolumeRevenue7" ||
              this.whatModule === "VolumeRevenue9"
            ) {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map((item: any) =>
                      item.seriesType === "line"
                        ? ""
                        : `<div style="display: flex;justify-content: space-between;">
                    <div><span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:${item.color
                        }"></span>
                     ${item.seriesName}</div>
                    <div style="margin-left:50px;">${Number(
                          item.data
                        ).toLocaleString()}</div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
              return;
            }
            if (
              this.whatModule === "VolumeRevenue0" ||
              this.whatModule === "VolumeRevenue2" ||
              this.whatModule === "VolumeRevenue3" ||
              this.whatModule === "VolumeRevenue4"
            ) {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map(
                      (item: any) =>
                        `<div style="display: flex;justify-content: space-between;">
                    <div>${item.seriesType === "line"
                          ? item.marker
                          : '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:' +
                          item.color +
                          '"></span>'
                        }${item.seriesType === "line" ? "WoW" : item.seriesName
                        }</div>
                    <div style="margin-left:50px;">${Number(
                          item.data
                        ).toLocaleString()}${item.seriesType === "line" ? "%" : ""
                        }</div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
              return;
            }
            if (
              this.whatModule === "OperationData" ||
              this.whatModule === "RepeatAccountshipper"
            ) {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map(
                      (item: any) =>
                        `<div style="display: flex;justify-content: space-between;">
                    <div>${item.seriesType === "line"
                          ? item.marker
                          : '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:' +
                          item.color +
                          '"></span>'
                        }${item.seriesName}</div>
                    <div style="margin-left:50px;">
                     ${this.whatModule === "RepeatAccountshipper" &&
                          this.selectWord.nnr &&
                          item.seriesType === "bar"
                          ? "$"
                          : ""
                        }
                    ${Number(item.data).toLocaleString()}${item.seriesType === "line" ? "%" : ""
                        }
                    </div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
              return;
            }
          }
          if (this.echartsData.filterOpt.isCompareLast) {
            if (this.whatModule === "VolumeRevenue1") {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map(
                      (item: any) =>
                        `<div style="display: flex;justify-content: space-between;">
                    <div>${item.seriesType === "line"
                          ? item.marker
                          : '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:' +
                          item.color +
                          '"></span>'
                        }${item.seriesType === "line" ? "YoY" : item.seriesName
                        }</div>
                    <div style="margin-left:50px;">${item.seriesType === "bar" ? "$" : ""
                        }${Number(item.data).toLocaleString()}${item.seriesType === "line" ? "%" : ""
                        }</div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
              return;
            }
            if (
              this.whatModule === "VolumeRevenue5" ||
              this.whatModule === "VolumeRevenue6" ||
              this.whatModule === "VolumeRevenue8"
            ) {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map((item: any) =>
                      item.seriesType === "line"
                        ? ""
                        : `<div style="display: flex;justify-content: space-between;">
                    <div><span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:${item.color
                        }"></span>
                     ${item.seriesName}</div>
                    <div style="margin-left:50px;">$${Number(
                          item.data
                        ).toLocaleString()}</div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
              return;
            }
            if (
              this.whatModule === "VolumeRevenue7" ||
              this.whatModule === "VolumeRevenue9"
            ) {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map((item: any) =>
                      item.seriesType === "line"
                        ? ""
                        : `<div style="display: flex;justify-content: space-between;">
                    <div><span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:${item.color
                        }"></span>
                     ${item.seriesName}</div>
                    <div style="margin-left:50px;">${Number(
                          item.data
                        ).toLocaleString()}</div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
              return;
            }
            if (
              this.whatModule === "VolumeRevenue0" ||
              this.whatModule === "VolumeRevenue2" ||
              this.whatModule === "VolumeRevenue3" ||
              this.whatModule === "VolumeRevenue4"
            ) {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map(
                      (item: any) =>
                        `<div style="display: flex;justify-content: space-between;">
                    <div>${item.seriesType === "line"
                          ? item.marker
                          : '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:' +
                          item.color +
                          '"></span>'
                        }${item.seriesType === "line" ? "YoY" : item.seriesName
                        }</div>
                    <div style="margin-left:50px;">${Number(
                          item.data
                        ).toLocaleString()}${item.seriesType === "line" ? "%" : ""
                        }</div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
              return;
            }
            if (
              this.whatModule === "OperationData" ||
              this.whatModule === "RepeatAccountshipper"
            ) {
              if (item0.name) {
                return `<div>
                  <div>${params && params[0].name}</div>
                  ${params
                    .map(
                      (item: any) =>
                        `<div style="display: flex;justify-content: space-between;">
                    <div>${item.seriesType === "line"
                          ? item.marker
                          : '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:' +
                          item.color +
                          '"></span>'
                        }${item.seriesName}</div>
                    <div style="margin-left:50px;">
                    ${this.whatModule === "RepeatAccountshipper" &&
                          this.selectWord.nnr &&
                          item.seriesType === "bar"
                          ? "$"
                          : ""
                        }${Number(item.data).toLocaleString()}${item.seriesType === "line" ? "%" : ""
                        }
                    </div>
                  </div>`
                    )
                    .join("")}
                </div>`;
              }
              return;
            }
          }
        },
      },
      // 图例组件
      legend: {
        show:
          this.echartsData.filterOpt.isCompareLast ||
            this.whatModule === "WechatUsers"
            ? true
            : false,
        itemHeight: 14,
        itemWidth: 14,
        itemGap: 48,
        textStyle: {
          fontSize: 14,
          color: "#999",
        },
        selectedMode: false, // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态

        // // 写死的数据
        // data: [
        //   {
        //     name: 'Follower',
        //     icon: "rect",
        //   },
        //   {
        //     name: 'Active User',
        //     icon: "rect",
        //   },
        //   {
        //     name: 'Stickiness Rate',
        //     icon: "circle",
        //   },
        //   {
        //     name: undefined,
        //     icon: "circle",
        //   },
        // ],
        data: [
          {
            name: this.option!.legend.data[0],
            icon: "rect",
          },
          {
            name: this.option!.legend.data[1],
            icon: "rect",
          },
          {
            name: this.option!.legend.data[2],
            icon: "circle",
          },
          {
            name: this.option!.legend.data[3],
            icon: "circle",
          },
        ],
      },
      // 直角坐标系内绘图网格
      grid: {
        left: grid.left,
        right:
          this.whatModule.indexOf("VolumeRevenue") > -1 ? 80 : grid.right,
        top:
          this.echartsData.filterOpt.isCompareLast ||
            this.whatModule === "WechatUsers"
            ? grid.top
            : 20,
        bottom: grid.bottom,
        containLabel: false,
      },
      xAxis: [
        {
          // name: "/ Month",
          type: "category",
          data: this.option!.xAxisData,
          splitNumber: 12,
          axisPointer: {
            type: "shadow",
          },
          nameTextStyle: {
            // 坐标轴名称与轴线之间的距离
            padding: xAxis.nameTextStyle.padding,
          },
          // 坐标轴线颜色
          axisLine: {
            lineStyle: {
              color: xAxis.axisLine.color,
            },
          },
          // 坐标轴刻度相关设置
          axisLabel: {
            interval: 0,
            color: "#333333",
            fontSize: 14,
            margin: 20,
            formatter: function (params: any) {
              const paramsArr = params.split(" ");
              return (paramsArr[0] || "") + "\n\n" + (paramsArr[1] || "");
            },
          },
          // 隐藏坐标轴刻度
          axisTick: {
            show: false,
          },
        },
      ],
      yAxis: this.isNoRate.includes(this.whatModule)
        ? [
          {
            type: "value",
            max: this.option!.max,
            splitNumber:
              this.whatModule === "WechatUsers"
                ? 5
                : this.whatModule.indexOf("VolumeRevenue") > -1
                  ? 5
                  : 10,
            interval:
              this.whatModule === "WechatUsers"
                ? this.option!.max / 5
                : this.whatModule.indexOf("VolumeRevenue") > -1
                  ? this.option!.max / 5
                  : this.option!.max / 10,
            // 隐藏坐标轴
            axisLine: {
              show: false,
              onZero: true,
              onZeroAxisIndex: 0,
            },
            // 隐藏坐标轴刻度
            axisTick: {
              show: false,
            },
            // 坐标轴刻度相关设置
            axisLabel: {
              show: true,
              color: yAxis.axisLabel.color,
              fontSize: yAxis.axisLabel.fontSize,
              margin: yAxis.axisLabel.margin,
              formatter: (value: any) =>
                this.whatModule.indexOf("VolumeRevenue") === -1
                  ? `${Number(value).toLocaleString()}`
                  : value < 0
                    ? ""
                    : `${Number(value).toLocaleString()}`,
            },
            // 坐标轴在 grid 区域中的分隔线设置
            splitLine: {
              show: true,
              lineStyle: {
                type: yAxis.splitLine.type,
                color: yAxis.splitLine.color,
              },
            },
          },
        ]
        : [
          {
            type: "value",
            min:
              this.whatModule.indexOf("VolumeRevenue") === -1
                ? 0
                : -this.option!.max,
            max: this.option!.max,
            splitNumber:
              this.whatModule === "WechatUsers"
                ? 5
                : this.whatModule.indexOf("VolumeRevenue") > -1
                  ? 5
                  : 10,
            interval:
              this.whatModule === "WechatUsers"
                ? this.option!.max / 5
                : this.whatModule.indexOf("VolumeRevenue") > -1
                  ? this.option!.max / 5
                  : this.option!.max / 10,
            // 隐藏坐标轴
            axisLine: {
              show: false,
              onZero: true,
              onZeroAxisIndex: 0,
            },
            // 隐藏坐标轴刻度
            axisTick: {
              show: false,
            },
            // 坐标轴刻度相关设置
            axisLabel: {
              show: true,
              color: yAxis.axisLabel.color,
              fontSize: yAxis.axisLabel.fontSize,
              margin: yAxis.axisLabel.margin,
              formatter: (value: any) =>
                this.whatModule.indexOf("VolumeRevenue") === -1
                  ? `${Number(value).toLocaleString()}`
                  : value < 0
                    ? ""
                    : `${Number(value).toLocaleString()}`,
            },
            // 坐标轴在 grid 区域中的分隔线设置
            splitLine: {
              show: true,
              lineStyle: {
                type: yAxis.splitLine.type,
                color: yAxis.splitLine.color,
              },
            },
          },
          {
            type: "value",
            min:
              this.whatModule.indexOf("VolumeRevenue") > -1
                ? -this.option!.maxThi
                : 0,
            max:
              this.whatModule.indexOf("VolumeRevenue") > -1
                ? this.option!.maxThi
                : 100,
            splitNumber: this.whatModule === "WechatUsers" ? 5 : 10,
            interval:
              this.whatModule === "WechatUsers"
                ? 20
                : this.whatModule.indexOf("VolumeRevenue") > -1
                  ? this.option!.maxThi / 5
                  : 10,
            axisLine: {
              show: false,
              onZero: true,
              onZeroAxisIndex: 0,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#333333",
              fontSize: 14,
              margin: 24,
              formatter: "{value}%",
              // formatter: (value) =>
              //   this.whatModule.indexOf("VolumeRevenue") === -1
              //     ? `${value}%`
              //     : value < -100
              //     ? ""
              //     : `${value}%`,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "rgba(153, 153, 153, 1)",
              },
            },
          },
        ],

    };
    if (this.isNoRate.includes(this.whatModule)) {
      option.series = [
        {
          name: this.option!.legend.data[0],
          type: "bar",
          barWidth: series.barWidth, //柱图宽度
          data: this.option!.series.fir,
          // 柱条颜色
          itemStyle: {
            color: "rgba(0, 133, 125, 1)",
          },
          label: {
            normal: {
              show: this.echartsData.filterOpt.isShowData, // 是否显示数据
              position: series.label.position,
              distance: 0,
              fontSize: 11,
              formatter: (params: any) => {
                if (
                  this.isAmount.includes(this.whatModule) ||
                  this.selectWord.nnr
                ) {
                  return "$" + Number(params.data).toLocaleString();
                }
                return Number(params.data).toLocaleString();
              },
            },
          },
        },
        {
          name: this.option!.legend.data[1],
          type: "bar",
          barWidth: series.barWidth, //柱图宽度
          data: this.option!.series.sec,
          itemStyle: {
            color: "rgba(66, 109, 169, 1)",
          },
          label: {
            normal: {
              show: this.echartsData.filterOpt.isShowData, // 是否显示数据
              position: series.label.position,
              distance: 0,
              fontSize: 11,
              formatter: (params: any) => {
                if (
                  this.isAmount.includes(this.whatModule) ||
                  this.selectWord.nnr
                ) {
                  return "$" + Number(params.data).toLocaleString();
                }
                return Number(params.data).toLocaleString();
              },
            },
          },
        },
      ];
      if (this.echartsData.filterOpt.isCompareLast) {
        option.series[0].data = this.option!.series.sec;
        option.series[0].itemStyle = { color: "rgba(66, 109, 169, 1)" };
        option.series[1].data = this.option!.series.fir;
        option.series[1].itemStyle = { color: "rgba(0, 133, 125, 1)" };
      }
    } else {
      option.series = [
        {
          name: this.option!.legend.data[0],
          type: "bar",
          barWidth: series.barWidth, //柱图宽度
          data: this.option!.series.fir,
          // 柱条颜色
          itemStyle: {
            color: "rgba(0, 133, 125, 1)",
          },
          label: {
            normal: {
              show: this.echartsData.filterOpt.isShowData, // 是否显示数据
              position: series.label.position,
              distance: 0,
              fontSize: 11,
              formatter: (params: any) => {
                if (
                  this.isAmount.includes(this.whatModule) ||
                  this.selectWord.nnr
                ) {
                  return "$" + Number(params.data).toLocaleString();
                }
                return Number(params.data).toLocaleString();
              },
            },
          },
        },
        {
          name: this.option!.legend.data[1],
          type: "bar",
          barWidth: series.barWidth, //柱图宽度
          data: this.option!.series.sec,
          itemStyle: {
            color: "rgba(66, 109, 169, 1)",
          },
          label: {
            normal: {
              show: this.echartsData.filterOpt.isShowData, // 是否显示数据
              position: series.label.position,
              distance: 0,
              fontSize: 11,
              formatter: (params: any) => {
                if (
                  this.isAmount.includes(this.whatModule) ||
                  this.selectWord.nnr
                ) {
                  return "$" + Number(params.data).toLocaleString();
                }
                return Number(params.data).toLocaleString();
              },
            },
          },
        },
        {
          name: this.option!.legend.data[2],
          type: "line",
          yAxisIndex: 1,
          data: this.option!.series.thi,
          itemStyle: {
            color: "rgba(212, 157, 100, 1)",
          },
          label: {
            normal: {
              show: this.echartsData.filterOpt.isShowData, // 是否显示数据
              position: "bottom",
              // formatter: "{c}%",
              fontSize: 12,
              formatter: function (params: any) {
                return Number(params.data).toLocaleString();
              },
            },
          },
        },
        {
          name: this.option!.legend.data[3],
          type: "line",
          yAxisIndex: 1,
          data: this.option!.series.fou,
          itemStyle: {
            color: "rgba(118, 136, 29, 1)",
          },
          label: {
            normal: {
              show: this.echartsData.filterOpt.isShowData, // 是否显示数据
              position: "bottom",
              // formatter: "{c}%",
              fontSize: 12,
              formatter: function (params: any) {
                return Number(params.data).toLocaleString();
              },
            },
          },
        },
      ];
      if (this.echartsData.filterOpt.isCompareLast) {
        if (this.whatModule !== "WechatUsers") {
          option.series[0].data = this.option!.series.sec;
          option.series[0].itemStyle = { color: "rgba(66, 109, 169, 1)" };
          option.series[1].data = this.option!.series.fir;
          option.series[1].itemStyle = { color: "rgba(0, 133, 125, 1)" };
          if (this.option.legend.data.length === 4) {
            option.series[2].data = this.option!.series.fou;
            option.series[2].itemStyle = { color: "rgba(118, 136, 29, 1)" };
            option.series[3].data = this.option!.series.thi;
            option.series[3].itemStyle = { color: "rgba(212, 157, 100, 1)" };
          }
        }
      }
    }
    // 对比去年显示所有，无对比去年只显示Amount和Rate
    if (this.whatModule === "OperationData") {
      if (!this.echartsData.filterOpt.isCompareLast) {
        option.legend.selected = {
          Number: true,
          NumberLastYear: false,
          Rate: true,
          RateLastYear: false,
        };
      }
    }
    if (this.whatModule.indexOf("VolumeRevenue") > -1) {
      if (!this.echartsData.filterOpt.isCompareLast) {
        option.legend.selected = {
          Amount: true,
          LastYear: false,
          Rate: true,
        };
      }
    }
    if (this.whatModule === "RepeatAccountshipper") {
      if (!this.echartsData.filterOpt.isCompareLast) {
        option.legend.selected = {
          Amount: true,
          AmountLastYear: false,
          Rate: true,
          RateLastYear: false,
        };
      }
    }
    const elId = document.getElementById(this.elId) as HTMLCanvasElement
    // const elId = document.getElementById(this.elId) as HTMLElement
    this.myChart = echarts.init(elId);
    // this.myChart = echarts.init('main-test');
    // this.myChart = echarts.init(document.getElementById(this.elId));
    this.myChart.clear();
    this.myChart.setOption(option);
    this.myChart.resize();
  }

  ngOnDestroy(): void {
    /* 窗口变化时自适应 步骤三 组件被注销时，缩放函数是匿名函数，且仍然在事件监听列表中，
    因此匿名函数和匿名函数中用到的外部变量在组件注销后均不会被清理。
     所以要手动清理 */
    window.removeEventListener("resize", this.resizeHandle);
  }

  // 测试展示图表
  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };

  testDefault() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main') as HTMLDivElement);
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

}   
