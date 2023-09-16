// An ECharts instance for easier development

import ReactECharts from "echarts-for-react"
import type { EChartsOption } from "echarts-for-react"
import React from "react"

interface IChartInstance {
  chartType: "line" | "bar" | "pie" | "horizontalBar"
  hasToolbox?: boolean
  theme?: string
  myOption: EChartsOption
  style?: object
}

// register echarts themes here

const ChartInstance = ({
  theme,
  myOption,
  hasToolbox = false,
  chartType,
  style
}: IChartInstance) => {
  const series = myOption.series.map((property: EChartsOption) =>
    chartType === "bar"
      ? {
          type: chartType,
          barGap: 0,
          emphasis: {
            focus: "series"
          },
          ...property
        }
      : {
          type: chartType,
          ...property
        }
  )

  const defaultOption: EChartsOption = {
    toolbox: {
      show: hasToolbox,
      orient: "horizontal",
      left: "right",
      bottom: "top",
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar", "stack"] },
        restore: { show: true }
      }
    },
    legend: {
      pageIconColor: "#fff",
      pageTextStyle: {
        color: "fff"
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      },
      position: (pos: any, params: any, el: any, elRect: any, size: any) => {
        const obj: any = { marginTop: "1px" }
        obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 0
        return obj
      }
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      type: "value"
    }
  }
  const lineOption: EChartsOption = {
    toolbox: { ...defaultOption.toolbox },
    tooltip: { ...defaultOption.tooltip },
    legend: { ...defaultOption.legend },
    grid: {
      left: "5%",
      right: "5%",
      bottom: 30,
      containLabel: true
    },
    xAxis: {
      type: "category"
    }
  }
  const barOption: EChartsOption = {
    toolbox: { ...defaultOption.toolbox },
    tooltip: { ...defaultOption.tooltip },
    legend: { ...defaultOption.legend },
    grid: {
      left: "2.5%",
      right: "5%",
      bottom: "10%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      axisTick: { show: false }
    }
  }
  const horizontalBarOption: EChartsOption = {
    toolbox: { ...defaultOption.toolbox },
    tooltip: { ...defaultOption.tooltip },
    legend: { ...defaultOption.legend },
    grid: {
      left: 20,
      right: 20,
      bottom: 30,
      containLabel: true
    },
    yAxis: [
      {
        type: "category",
        axisTick: { show: false }
      }
    ],
    xAxis: [
      {
        type: "value",
        position: "bottom",
        boundaryGap: [0, 0.01]
      }
    ]
  }
  const pieOption: EChartsOption = {
    legend: {
      top: "5%",
      left: "center",
      pageIconColor: "#fff",
      pageTextStyle: {
        color: "fff"
      }
    },
    tooltip: {
      trigger: "item"
    }
  }

  const chartOption =
    chartType === "line"
      ? lineOption
      : chartType === "bar"
      ? barOption
      : chartType === "pie"
      ? pieOption
      : chartType === "horizontalBar"
      ? horizontalBarOption
      : defaultOption

  const baseOption = {
    ...chartOption,
    ...myOption,
    grid: { ...chartOption.grid, ...myOption?.grid },
    legend: { ...chartOption.legend, ...myOption?.legend },
    tooltip: { ...chartOption.tooltip, ...myOption?.tooltip },
    series
  }
  const option: EChartsOption =
    chartType == "pie"
      ? baseOption
      : {
          ...baseOption,
          yAxis: [...myOption.yAxis],
          xAxis: { ...chartOption.xAxis, ...myOption.xAxis }
        }

  return (
    <ReactECharts option={option} notMerge={true} lazyUpdate={true} theme={theme} style={style} />
  )
}

export default ChartInstance
