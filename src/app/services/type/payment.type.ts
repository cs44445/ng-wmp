export interface Status {
  description: string,
  value: number
}

export interface ShipmentsParams {
  searchTerm?: string,
  paymentStatus?: number | string,
  fromDate?: string,
  toDate?: string,
  pageNum: number
  pageSize: number
}

export interface PayStatusOPtionsItem {
  label: string,
  value: number
}
export interface StatusItem {
  description: string,
  value: number
}
export interface Condition {
  searchTerm: string,
  paymentStatus?: number | string,
  date?: any
}