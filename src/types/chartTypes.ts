export interface IChartSeries {
  name?: string
  type: string
  data?: any
  stack?: string
  emphasis?: { [key: string]: any } | null | undefined
  smooth?: boolean
  yAxisIndex?: number
  value?: any
}
export interface IChartOptions {
  keyJson: string
  dataJson: string
  chartType: "bar" | "line" | "pie"
}
export interface IDynamicService {
  dataUrl: string
  chart: IChartOptions[]
  xAxisKeyName: string
  dataPath: string
}
