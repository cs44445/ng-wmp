import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { echartsData, echartsSettings } from '../../../../utils/dashboard-data'
import { v1 as uuidv1 } from "uuid"
// import * as echarts from "echarts/lib/echarts";
import * as echarts from 'echarts';
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import { BarOption } from 'src/app/services/type/echarts.type';

interface ModuleObj {
  type: string,
  index: number
}

@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.scss']
})
export class BarChartsComponent implements OnInit {
  @Input() echartsSettings = echartsSettings
  @Input() echartsData = echartsData
  @Input() whatModule = ''
  @Input() selectWord = {
    nnr: false,
    volume: false,
    account: false,
  }
  @Output() chartsXAxis = new EventEmitter<ModuleObj>()
  elId = ""
  // option = {}
  option?: BarOption
  myChart = ""
  isPage = {
    previous: false,
    next: false
  }
  chartsHeight?: Number
  isNoRate = ['VolumeRevenue5', 'VolumeRevenue6', 'VolumeRevenue7', 'VolumeRevenue8', 'VolumeRevenue9']
  isAmount = ['VolumeRevenue1', 'VolumeRevenue5', 'VolumeRevenue6', 'VolumeRevenue8'] //显示美元符号
  constructor() { }

  ngOnInit(): void {
    this.elId = uuidv1(); //获取随机id
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
}   
