import ReactECharts, { EChartsReactProps } from "echarts-for-react";
import { IChartSeries, IDynamicService } from "../../../types/chartTypes";
import React, { useEffect, useState } from "react";
import { getDynamicChartData } from "../../../services/chart";
import useSWR from "swr";
import LoadingBox from "../../LoadingBox";
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
  position?: "left" | "right" | "top" | "bottom"
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
  xAxisType?: "category" | "value" | "time" | "log"
  yAxisType?: "category" | "value" | "time" | "log"
  dataCustomInfo?: IDataCustomInfo[]
  legend?: any
  tooltip?: any
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
  swrCallBackFnc,
  xAxisType,
  yAxisType,
  dataCustomInfo,
  legend,
  tooltip
}: IGenericChartProps) => {

  const { data, error } = useSWR(
    `${dynamicService.dataUrl.substring(dynamicService.dataUrl.lastIndexOf("/") + 1)}_${dynamicService.chart.map((item) => { return item.dataJson; }).join("_")}`,
    async () => {
      if (!swrCallBackFnc) {
        return getDynamicChartData(dynamicService, dataCustomInfo);
      }
      return await swrCallBackFnc(dynamicService, dataCustomInfo);
    },
    {
      refreshInterval: refreshRefetchMs
    }
  );
  const [chartData, setChartData] = useState<any>(series || []);
  const [chartXAxisData, setChartXAxisData] = useState<any>();
  const [chartYAxisData, setChartYAxisData] = useState<any>();
  const [customDataInfos, setCustomDataInfos] = useState<ICustomInfo[]>();
  useEffect(() => {
    console.log(data);
    const getData = async () => {
      try {

        if (series && series?.length > 0) {
          return;
        }
        setChartData(data?.series ?? []);
        setChartXAxisData(xAxisData
          ? xAxisData
          : {
            type: xAxisType, data: data?.xAxis.length > 0
              ? data?.xAxis
              : []
          });
        setChartYAxisData(yAxisData
          ? yAxisData
          : {
            type: yAxisType, data: data?.yAxis.length > 0
              ? data?.yAxis
              : []
          });
        setCustomDataInfos(data?.customDataInfos);
      }
      catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [data]);
  const option = {
    animationDuration: isAnimation && 10000,
    title: chartTitle && {
      textStyle: { color: textColor },
      text: chartTitle,
      left: "center"
    },
    textStyle: {
      color: textColor,
      fontFamily: "'DM Sans', sans-serif"
    },
    legend: legend
      ?
      legend
      : {
        type: "scroll",
        orient: "horizontal",
        bottom: "bottom",
        textStyle: {
          color: textColor,
          fontStyle: "'DM Sans', sans-serif"
        },
        pageButtonGap: "20",
        pageIconInactiveColor: "#fff",
        pageIconColor: "#000",
        pageTextStyle: "#fff"
      },
    tooltip: tooltip
      ?
      tooltip
      : {
        order: isAnimation && "valueDesc",
        trigger: "axis",
        grid: { containLabel: true },
        confine: true
      },
    xAxis: chartXAxisData
      ? chartXAxisData
      : {
        show: false
      },
    yAxis: chartYAxisData
      ? chartYAxisData
      : {
        show: false
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
  if (chartData?.length === 0) return (<LoadingBox />);
  if (error) return (<>Bir Hata Oluştu.</>);
  return (
    <div style={{ display: "flex" }}>
      <div style={{
        width:
          customDataInfos
            &&
            customDataInfos?.length > 0
            ? "75%"
            : "100%"
      }}>
        <ReactECharts
          option={option}
          notMerge={true}
          lazyUpdate={true}
          theme={theme}
          onChartReady={cbFn}
        />
      </div>
      <div style={{
        width:
          customDataInfos
            &&
            customDataInfos?.length > 0
            ? "25%"
            : "0%", alignSelf: "center"
      }}>
        {customDataInfos?.map((item: ICustomInfo, index: number) => {
          return (
            <div key={index} style={{ textAlign: "center", margin: "8px" }}>
              <p style={{ marginBottom: "5px" }}
              >{item.label}</p>
              <p>{item.value}{item.valueText}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
