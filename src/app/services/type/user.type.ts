export interface Base<T> {
  ret: number,
  message: string,
  data: T
}

export interface Email {
  email: string
}

export interface AzuretokenInfo {
  azureAccessToken?: string
  azureIdToken?: string
}