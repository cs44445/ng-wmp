import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-wechat-users-bar',
  templateUrl: './wechat-users-bar.component.html',
  styleUrls: ['./wechat-users-bar.component.scss']
})
export class WechatUsersBarComponent implements OnInit {
  barOption = {
    tooltip: {
      trigger: 'axis',
      // axisPointer: {//设置浮动的虚线
      //   type: 'cross',
      //   crossStyle: {
      //     color: '#999'
      //   }
      // }
    },
    legend: {
      data: [
        {
          name: 'Follower',
          icon: "rect",
        },
        {
          name: 'Active User',
          icon: "rect",
        },
        {
          name: 'Stickness Rate',
          icon: "circle",
        }
      ],
      selectedMode: false, // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态
      itemHeight: 14,
      itemWidth: 14,
      itemGap: 48,
      textStyle: {
        fontSize: 14,
        color: "#999",
      },
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisPointer: {
          type: 'shadow'
        },
        axisTick: {//隐藏坐标轴刻度
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 7000,
        interval: 1400,
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: { //网格线
          lineStyle: {
            type: 'dashed'//设置网格线类型 dotted：虚线 solid:实线
          },
          show: true //隐藏或显示
        }
      },
      {
        type: 'value',
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: '{value}%'
        },
        splitLine: { //网格线
          lineStyle: {
            type: 'dashed'//设置网格线类型 dotted：虚线 solid:实线
          },
          show: true //隐藏或显示
        }
      }
    ],
    series: [
      {
        name: 'Follower',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value: any) {
            return value;
          }
        },
        data: [
          6990, 3000, 4700, 5000, 2506, 7000, 1356, 1622, 3216, 2000, 6474, 3009
        ],
        barWidth: 24,
        itemStyle: {
          color: '#00857D'
        }
      },
      {
        name: 'Active User',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value: any) {
            return value;
          }
        },
        data: [
          5830, 4000, 4000, 6000, 1506, 5000, 1356, 1600, 2216, 3000, 6074, 2009
        ],
        barWidth: 24,
        itemStyle: {
          color: '#426DA9'
        }
      },
      {
        name: 'Stickness Rate',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value: any) {
            return value + '%';
          }
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
        itemStyle: {
          color: '#D49D64'
        }
      }
    ],
    max: 0,
    isPage: {
      previous: false,
      next: false
    },
    grid: {     // 直角坐标系内绘图网格
      left: 90,
      right: 74,
      top: 65,
      bottom: 80,
    },
  }
  constructor() { }

  ngOnInit(): void {
    this.initBarChart()
  }

  initBarChart() {
    const chartDom = document.getElementById('wechart_users_chart');
    const myChart = echarts.init(chartDom!);
    myChart.setOption(this.barOption);
  }

}
