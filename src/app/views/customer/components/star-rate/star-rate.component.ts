import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin } from 'rxjs';
import { CustomerService } from 'src/app/services/api/customer.service';
import { DateType } from 'src/app/services/type/customer.type';

@Component({
  selector: 'app-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.scss']
})
export class StarRateComponent implements OnInit {
  @Input() ratingType = ''
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
  pieOption = {
    title: {
      text: '2022/06/01-2022/06/08',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 100,
      bottom: 20,
      data: ['5star', '4star', '3star', '2star', '1star']
    },
    series: [{
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '5star', itemStyle: { color: '#AA651B' } },
        { value: 735, name: '4star', itemStyle: { color: '#C67D30' } },
        { value: 580, name: '3star', itemStyle: { color: '#D49D64' } },
        { value: 484, name: '2star', itemStyle: { color: '#E0B78D' } },
        { value: 300, name: '1star', itemStyle: { color: '#E8CBAC' } }

        // { value: '', name: '5star', itemStyle: { color: '#AA651B' } },
        // { value: '', name: '4star', itemStyle: { color: '#C67D30' } },
        // { value: '', name: '3star', itemStyle: { color: '#D49D64' } },
        // { value: '', name: '2star', itemStyle: { color: '#E0B78D' } },
        // { value: '', name: '1star', itemStyle: { color: '#E8CBAC' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }
  barOption = {
    xAxis: {
      type: 'category',
      data: ['5star', '4star', '3star', '2star', '1star'],
      axisLine: {//隐藏坐标轴轴线
        show: false
      },
      axisTick: {//隐藏坐标轴刻度
        show: false
      }
    },
    yAxis: {
      show: false, //隐藏y轴
      type: 'value',
      // splitLine: {//隐藏坐标轴刻度线
      //   show: false
      // }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: '#D6D6D6'
        },
        itemStyle: {
          color: '#E0B78D',
          label: {
            show: true,
            position: 'top',
            // formatter: (params:any) => {
            //   if (params.seriesName === 'y' || !this.barData || !this.barData.rows || !this.barData.rows.length) return ''
            //   return `${this.barData.rows[params.dataIndex].y}`
            // },
            color: '#333',
            fontWeight: 700,
            fontSize: 14,
          }
        },
        barWidth: 24//设置柱状图宽度
      }
    ]
  };

  constructor(
    private cusServe: CustomerService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.getData()
    this.initPieChart()
    this.initBarChart()
  }

  initPieChart(): void {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom!);
    myChart.setOption(this.pieOption);
  }

  initBarChart() {
    const chartDom = document.getElementById('bar');
    const myChart = echarts.init(chartDom!);
    myChart.setOption(this.barOption);
  }

  changeRadio(type: string) {
    this.dateType = { dateType: type }
    this.getData()
  }

  getData() {
    const id = this.message.loading('').messageId;
    forkJoin([
      this.cusServe.scores(this.dateType),
      this.cusServe.ratingTags(this.dateType)
    ]).subscribe(([scoreInfo, ratingInfo]) => {
      this.message.remove(id)
      this.headerList = ratingInfo
    })
  }

  formattedDateStr() {
    console.log(moment().subtract(3, 'days').calendar(), '=======');

    return moment().subtract(3, 'days').calendar();
  }

  // getScores() {
  //   const parmas = {
  //     ratingType: this.ratingType === '00' ? undefined : this.ratingType,
  //     tagIds: this.selectedTagIds,
  //     dateType: this.dateRange
  //   }
  //   scores(parmas).then(res => {
  //     const keys = Object.keys(res).sort()
  //     keys.reverse()

  //     const maxNum = Math.max(...keys.map(key => res[key])) || 100
  //     const maxBg = maxNum + maxNum / 5
  //     const maxLabel = maxBg + maxBg / 5

  //     keys.forEach((key, i) => {
  //       this.$set(this.ringData.rows, i, {
  //         rate: key,
  //         ratio: res[key]
  //       })
  //       this.$set(this.barData.rows, i, {
  //         x: `${5 - i} Star`,
  //         y: res[key],
  //         y1: maxBg,
  //       })
  //     })
  //     this.barExtend.yAxis.max = maxLabel
  //   })
  // }
}
