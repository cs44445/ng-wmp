export interface AverageScore {
  ratingType?: string
}

export interface DateType {
  dateType: string
}

export interface PanelsItem {
  name: string,
  active: boolean,
  childPanel: ChildPanel
}

export interface ChildPanel {
  active: boolean,
  name: string
}

export interface Cities {
  ratingType?: string
}

export interface UpdateRatingStatus {
  ratingId: string,
  status: string
}

export interface DotItem {
  createTime?: string,
  operator?: string,
  operationType?: string,
  content?: string
}

export interface RatingReplies {
  comment: string,
  ratingId: string
}