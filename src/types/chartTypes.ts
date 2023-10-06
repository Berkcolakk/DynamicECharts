export type TEChartsSeriesType =
        | 'line'
        | 'bar'
        | 'pie'
        | 'scatter'
        | 'effectScatter'
        | 'radar'
        | 'tree'
        | 'treemap'
        | 'sunburst'
        | 'boxplot'
        | 'candlestick'
        | 'heatmap'
        | 'map'
        | 'parallel'
        | 'lines'
        | 'graph'
        | 'sankey'
        | 'funnel'
        | 'gauge'
        | 'pictorialBar'
        | 'themeRiver'
        | 'custom';
export interface IChartSeries {
  name?: string
  type: string
  data?: any
  stack?: string
  emphasis?: Record<string, any> | null | undefined
  smooth?: boolean
  yAxisIndex?: number
  value?: any
}
export interface IChartOptions {
  keyJson: string
  dataJson: string
  chartType: TEChartsSeriesType
  chartName?: string;
}
export interface IDynamicService {
  dataUrl: string
  chart: IChartOptions[]
  xAxisKeyName?: string
  yAxisKeyName?: string
  dataPath?: string
}

export interface ICustomInfo {
  value: string;
  valueText: string;
  label: string;
}
export interface IYAxisProps {
  type?: string
  name?: string
  alignTicks?: boolean
  axisLine?: object
  min?: number
  max?: number
  axisLabel?: object
  show?: boolean
  position?: 'left' | 'right' | 'top' | 'bottom'
  offset?: number;
}
export interface IDataCustomInfo {
  keyName: string;
  label: string;
  valueText: string;
}
export interface IGenericChartProps {
  grid?: object
  chartTitle?: string
  xAxisData?: any
  yAxisData?: any
  theme?: string
  series?: IChartSeries[]
  cbFn?: () => void
  isAnimation?: boolean
  dynamicService: IDynamicService
  textColor: string
  refreshRefetchMs: number
  swrCallBackFnc?: (dynamicService: IDynamicService, dataCustomInfo?: IDataCustomInfo[]) => any | undefined
  xAxisType?: 'category' | 'value' | 'time' | 'log'
  yAxisType?: 'category' | 'value' | 'time' | 'log'
  dataCustomInfo?: IDataCustomInfo[]
  legend?: any
}