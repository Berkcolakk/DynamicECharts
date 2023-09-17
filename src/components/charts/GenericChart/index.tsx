import ReactECharts from "echarts-for-react";
import { IChartSeries, IDynamicService } from "../../../types/chartTypes";
import React, { useEffect, useState } from "react";
import { getDynamicChartData } from "../../../services/chart";
import useSWR from "swr";
import LoadingBox from "../../LoadingBox";
import { onErrorSWR } from "../../../utils";
export interface IyAxisProps {
  type: string
  name?: string
  alignTicks?: boolean
  axisLine?: object
  min?: number
  max?: number
  axisLabel?: object
}

export interface IGenericChartProps {
  grid?: object
  chartTitle?: string
  xAxisData?: any
  yAxisData?: IyAxisProps[] | IyAxisProps
  theme?: string
  series?: IChartSeries[]
  cbFn?: () => void
  isAnimation?: boolean
  dynamicService: IDynamicService
  textColor: string
  refreshRefetchMs: number
  legend?: object
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
}: IGenericChartProps) => {
  const { data, error, isLoading } = useSWR(
    chartTitle,
    async () => {
      return await getDynamicChartData(dynamicService);
    },
    {
      refreshInterval: refreshRefetchMs
    }
  );
  const [chartData, setChartData] = useState<any>(series || []);
  const [chartXAxisData, setChartXAxisData] = useState<any[] | undefined>(xAxisData || []);
  const [chartYAxisData, setChartYAxisData] = useState<IyAxisProps[] | IyAxisProps | undefined>(yAxisData);
  useEffect(() => {
    const getData = async () => {
      if (series && series?.length > 0) {
        return;
      }
      setChartData(data?.series);
      setChartXAxisData(data?.xAxis);
      setChartYAxisData(data?.yAxis);
    };
    getData();
  }, [data, isLoading]);
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
    xAxis: chartXAxisData || {
      type: "category",
      data: chartXAxisData
    },
    yAxis: chartYAxisData || {
      type: "value",
      data: chartYAxisData
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
  };

  return (
    <>
      {isLoading
        ? <LoadingBox /> :
        <ReactECharts
          option={option}
          notMerge={true}
          lazyUpdate={true}
          theme={theme}
          onChartReady={cbFn}

        />}
    </>
  );
};
