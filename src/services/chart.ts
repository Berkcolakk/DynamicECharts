import type { IChartOptions, IChartSeries, IDynamicService } from "../types/chartTypes"
import jsonpath from "jsonpath"
export const getIndicatorById = async (url: string) => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}
const getData = async (dynamicService: IDynamicService) => {
  const res = await getIndicatorById(dynamicService.dataUrl)
  const data = jsonpath.query(res, dynamicService.dataPath)[0]
  return data
}
export const getPieChartData = async (dynamicService: IDynamicService) => {
  const data = await getData(dynamicService)
  const result = insertOrUpdateChartArr({
    data: data,
    charts: dynamicService.chart,
    xAxisKeyName: dynamicService.xAxisKeyName
  })
  return { type: "pie", name: "", data: result.series }
}
export const getDynamicChartData = async (dynamicService: IDynamicService) => {
  const data = await getData(dynamicService)
  return insertOrUpdateChartArr({
    data: data,
    charts: dynamicService.chart,
    xAxisKeyName: dynamicService.xAxisKeyName
  })
}

const insertOrUpdateChartArr = ({
  data,
  charts,
  xAxisKeyName
}: {
  data: any
  charts: IChartOptions[]
  xAxisKeyName: string
}) => {
  const xAxis = []

  const series = [] as IChartSeries[]
  for (let index = 0; index < data.length; index++) {
    const element = data[index]
    for (let x = 0; x < charts.length; x++) {
      const chartInfo = charts[x]
      const name = jsonpath.query(element, chartInfo.keyJson)[0]
      const val = jsonpath.query(element, chartInfo.dataJson)[0]
      if (chartInfo.chartType === "pie") {
        series.push({ value: val, name: name, type: chartInfo.chartType })
        continue
      }
      const objIndex = series.findIndex(obj => obj.name === name)
      if (objIndex !== -1) {
        const item = series.filter(obj => obj.name === name)[0]
        series[objIndex] = { type: chartInfo.chartType, name: name, data: [...item.data, val] }
        continue
      }
      series.push({ type: chartInfo.chartType, name: name, smooth: false, data: val })
    }
    xAxis.push(element[xAxisKeyName])
  }
  return {
    series: series,
    xAxis: xAxis
  }
}
