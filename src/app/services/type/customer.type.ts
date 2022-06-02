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