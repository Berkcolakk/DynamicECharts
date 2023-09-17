import ReactECharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import { getPieChartData } from "../../../services/chart";
import { IDynamicService } from "../../../types/chartTypes";
import useSWR from "swr";
import LoadingBox from "../../LoadingBox";
import { GenericChart, IGenericChartProps } from "../GenericChart";
export interface IPieChartSeries {
  name?: string | null
  type: string
  radius?: string | string[] | number | number[]
  center?: string | string[] | number | number[]
  startAngle?: number
  data?: Array<object> | any
  emphasis?: { [key: string]: any } | null | undefined
}

export interface IPieChartProps {
  theme?: string
  isScroll?: boolean
  series?: IPieChartSeries[]
  legend?: object // has legend?
  selectableLegend?: boolean // is the legend selectable?
  isHalf?: boolean // is Half PieChart?
  cbFn?: () => void
  dynamicService: IDynamicService
  textColor: string
  chartTitle: string
  refreshRefetchMs: number
}

export const PieChart = (props: IGenericChartProps) => {
  return (
    <GenericChart {...props}
      swrCallBackFnc={(dynamicService: IDynamicService) => {
        return getPieChartData(dynamicService);
      }} />
  );
};
