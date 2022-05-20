
export interface Legend {
  data: string[]
}

export interface TwoSeries {
  fir: string[],
  sec: string[]
}

export interface ThreeSeries extends TwoSeries {
  thi: string[],
}

export interface FourSeries extends ThreeSeries {
  fou: string[]
}

export interface IsPage {
  previous: boolean,
  next: boolean
}

export interface DefaultOption {
  xAxisData: string[],
  legend: Legend,
  max: number,
  isPage: IsPage
}

// export interface BarOption extends DefaultOption {
//   series: ThreeSeries,
// }

export interface BarOption {
  xAxisData: string[],
  legend: Legend,
  max: number,
  isPage: IsPage
  series: ThreeSeries,
}

export interface WechatUsers {
  barOption: BarOption,
  lineOption: LineOption,
}

export interface LineOption extends DefaultOption {
  series: FourSeries,
}

export interface FilterOpt {
  dateValue: string[],
  isShowData: boolean,
  isWeekly: boolean,
  isCompareLast: boolean
}

export interface OperationBarOption extends DefaultOption {
  series: FourSeries
}

export interface BingOptionSeriesData {
  value: number,
  name: string
}

export interface BingOptionSeries {
  data: BingOptionSeriesData[]
}

export interface BingOption {
  legend: Legend,
  series: BingOptionSeries
}

export interface BarSimpleOption {
  xAxisData: string[],
  legend: Legend,
  max: number,
  series: TwoSeries
}

export interface ODataOBarption extends DefaultOption {
  series: TwoSeries
}

export interface OperationData {
  barOption: OperationBarOption,
  bingOption: BingOption[],
  barSimpleOption: ODataOBarption
}

export interface VolumeBarOption extends DefaultOption {
  series: ThreeSeries | TwoSeries,
}

export interface VolumeRevenue {
  barOption: VolumeBarOption[],
  bingOption: BingOption[],
  duiOption: BarSimpleOption[]
}

export interface RepeatAccountShipper {
  barOption: OperationBarOption
}

export interface CSBarBackgroundYAxis {
  max: number
}

export interface CSBarBackgroundSeries {
  data: number[]
}

export interface CSBarBackgroundOption {
  legend: Legend,
  series: CSBarBackgroundSeries,
  yAxis: CSBarBackgroundYAxis,
}
export interface CustomerSatisfaction {
  barBackgroundOption: CSBarBackgroundOption,
  bingOption: BingOption
}

export interface EchartsData {
  filterOpt: FilterOpt,
  wechatUsers: WechatUsers,
  operationData: OperationData,
  volumeRevenue: VolumeRevenue,
  repeatAccountShipper: RepeatAccountShipper,
  customerSatisfaction: CustomerSatisfaction,
}






