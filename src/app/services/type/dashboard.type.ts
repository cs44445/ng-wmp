
export interface ActiveUsers {
  activeUserInfo: ActiveUserInfo,
  currentFollowers: number
}

// export interface ActiveUserInfo {
//   dayActiveUser: number,
//   monthActiveUser: number,
//   stickinessRate: string
// }

export interface ExportArg {
  startDate: string,
  endDate: string,
  isWeek: boolean
  exportCodes: number
}

export interface WechatUsers {
  startDate: string,
  endDate: string,
  isShowWeekly: boolean
}

export interface WechatUserInfo {
  date: string,
  follower: number,
  month: string,
  netIncrease: number,
  newFollower: number,
  unFollower: number,
}

type StrOrNum = string | number

export interface ActiveUserInfo {
  activeUserNumers: number,
  date: string,
  stickinessRate: string
}

export interface ActiveUserInfo {
  dayActiveUser: number,
  monthActiveUser: number,
  stickinessRate: string
}

export interface OperationArg {
  dataType: string,
  endDate: string,
  isCompareLastYear: boolean,
  isShowWeekly: boolean,
  startDate: string
}

export interface CurrentYearData {
  monthOrWeek: string,
  period: string,
  successAmount: string,
  successRate: string,
  totalAmount: string,
  year: string
}

export interface OperationLogData {
  currentDataSuccessRate: string,
  currentTotalDataAmount: string,
  currentYearDataList: CurrentYearData
}

export interface HitFrequency {
  endDate: string,
  isCompareLastYear: boolean,
  isShowWeekly: boolean,
  startDate: string
}

export interface RevenueFiterType {
  description: string,
  value: number
}

export interface RevenueFiterInfo {
  AccountType: RevenueFiterType[],
  BillTerm: RevenueFiterType[],
  ServiceType: RevenueFiterType[],
}

export interface RevenueArgs {
  accountType: number,
  billTerm: number,
  globalFilter: GlobalFilter
  isShowADNNR: boolean,
  isShowADV: boolean,
  isShowNNR: boolean,
  isShowRPK: boolean,
  isShowRPP: boolean,
  isShowShipment: boolean,
  isShowUser: boolean,
  isShowVolume: boolean,
  isShowWPP: boolean,
  isShowWeight: boolean,
  serviceType: number
}

export interface GlobalFilter {
  startDate: string,
  endDate: string,
  isShowWeekly: boolean,
  isCompareLastYear: boolean
}

export interface RRCurrentYear {
  accountAmount: string,
  accountAmountRate: string,
  nnr: string,
  nnrRate: string,
  period: string,
  volume: string,
  volumeRate: string,
  year: string,
}


export interface RandomRatingsData {
  currentYearDataList: RRCurrentYear,
  currentYearDataTotalAccount: string,
  currentYearDataTotalAccountRate: string,
  currentYearDataTotalNNR: string,
  currentYearDataTotalNNRRate: string,
  currentYearDataTotalVolume: string,
  currentYearDataTotalVolumeRate: string,
}

export interface RatingsArg {
  ratingType: string,
  startDate: string,
  endDate: string,
}

export interface KpiScoresArg {
  ratingType: string,
  city: string,
  startDate: string,
  endDate: string,
}

export interface KpiScoresData {
  cityStarRate: number,
  countStarScore: CountStarScore
}

export interface CountStarScore {
  star1: number,
  star4: number,
  star5: number,
  star2: number,
  star3: number
}














