import ReactECharts from "echarts-for-react"
import { IChartOptions, IChartSeries, IDynamicService } from "../../types/chartTypes"
import React, { useEffect, useState } from "react"
import { getDynamicChartData, getIndicatorById } from "../../services/chart"
import useSWR from "swr"
interface yAxisProps {
  type: string
  name?: string
  alignTicks?: boolean
  axisLine?: object
  min?: number
  max?: number
  axisLabel?: object
}

interface LineChartProps {
  grid?: object
  chartTitle?: string
  xAxisData?: string[]
  yAxisData?: yAxisProps[] | yAxisProps
  theme?: string
  series?: IChartSeries[]
  cbFn?: () => void
  isAnimation?: boolean
  dynamicService: IDynamicService
  textColor: string
  refreshRefetchMs: number
  legend: object
}
interface xAxis {
  name: string
}

export const GenericChart = ({
  chartTitle,
  grid,
  xAxisData,
  yAxisData,
  series,
  isAnimation = false,
  theme,
  cbFn,
  dynamicService,
  textColor,
  refreshRefetchMs,
  legend
}: LineChartProps) => {
  const { data, error, isLoading } = useSWR(
    chartTitle,
    async () => {
      return await getDynamicChartData(dynamicService)
    },
    { refreshInterval: refreshRefetchMs }
  )
  const [chartData, setChartData] = useState<any>(series || [])
  const [ChartXAxisData, setChartXAxisData] = useState<any[] | undefined>(xAxisData || [])
  useEffect(() => {
    const getData = async () => {
      if (series && series?.length > 0) {
        return
      }
      setChartData(data?.series)
      setChartXAxisData(data?.xAxis)
    }
    getData()
  }, [data, isLoading])
  const option = {
    animationDuration: isAnimation && 10000,
    title: {
      textStyle: { color: textColor },
      text: chartTitle,
      left: "center"
    },
    textStyle: {
      color: textColor
    },
    legend: legend
      ? legend
      : {
        type: "scroll",
        orient: "horizontal",
        bottom: "bottom",
        textStyle: {
          color: textColor
        }
      },
    tooltip: {
      order: isAnimation && "valueDesc",
      trigger: "axis"
    },
    xAxis: {
      type: "category",
      data: ChartXAxisData
    },
    yAxis: yAxisData || {
      type: "value"
    },
    grid: grid
      ? grid
      : {
        left: "5%",
        right: "5%",
        bottom: "5%",
        containLabel: true
      },
    series: chartData
  }

  return (
    <ReactECharts
      option={option}
      notMerge={true}
      lazyUpdate={true}
      theme={theme}
      onChartReady={cbFn}
    />
  )
}
