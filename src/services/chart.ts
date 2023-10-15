import { ICustomInfo, IDataCustomInfo } from "components/Charts/GenericChart";
import type { IChartOptions, IChartSeries, IDynamicService } from "../types/chartTypes";
import jsonpath from "jsonpath";

const getData = async (dynamicService: IDynamicService) => {
  // eslint-disable-next-line no-undef
  const result = await fetch(dynamicService.dataUrl, { body: dynamicService.data });
  const response = await result.json();
  if (dynamicService.dataPath !== undefined) {
    return jsonpath.query(response, dynamicService.dataPath)[0];
  }
  return response;
};

export const getPieChartData = async (dynamicService: IDynamicService, dataCustomInfo?: IDataCustomInfo[]) => {
  const data = await getData(dynamicService);
  return insertOrUpdateChartArr({
    data,
    charts: dynamicService.chart,
    xAxisKeyName: dynamicService.xAxisKeyName,
    yAxisKeyName: dynamicService.yAxisKeyName,
    dataCustomInfo
  });

};
export const getDynamicChartData = async (dynamicService: IDynamicService, dataCustomInfo?: IDataCustomInfo[]) => {
  const data = await getData(dynamicService);
  return insertOrUpdateChartArr({
    data,
    charts: dynamicService.chart,
    xAxisKeyName: dynamicService?.xAxisKeyName,
    yAxisKeyName: dynamicService?.yAxisKeyName,
    dataCustomInfo
  });
};


const addCustomInfo = ({ data, dataCustomInfo }:
  {
    data: any;
    dataCustomInfo?: IDataCustomInfo[]
  }) => {
  const arr = [] as ICustomInfo[];
  dataCustomInfo?.forEach((item: IDataCustomInfo) => {
    if (item.keyName) {
      const val = jsonpath.query(data, item.keyName)[0];
      arr.push({
        label: item.label,
        value: val,
        valueText: item.valueText
      });
    }
  });
  return arr;
};

const insertOrUpdateChartArr = ({
  data,
  charts,
  xAxisKeyName,
  yAxisKeyName,
  dataCustomInfo
}: {
  data: any
  charts: IChartOptions[]
  xAxisKeyName?: string
  yAxisKeyName?: string;
  dataCustomInfo?: IDataCustomInfo[]
}) => {
  const xAxis = [];
  const yAxis = [];
  const series = [] as IChartSeries[];
  for (let x = 0; x < charts.length; x++) {
    const seriesData = [] as any;
    const chartInfo = charts[x];
    let name = chartInfo.chartName ?? "";

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (chartInfo.keyJson) {
        name = jsonpath.query(element, chartInfo.keyJson)[0];
      }
      const val = jsonpath.query(element, chartInfo.dataJson)[0];
      //ChartInfonun ilk döngüsünde çiftlememesi için x ve y axislerin yazdırılma işlemidir.
      if (x === 0) {
        if (xAxisKeyName) {
          xAxis.push(element[xAxisKeyName]);
        }
        if (yAxisKeyName) {
          yAxis.push(element[yAxisKeyName]);
        }
      }
      seriesData.push({ value: val, name: name, xAxisIndex: x, });
    }
    if (!Array.isArray(data) && seriesData.length === 0) {
      if (chartInfo.keyJson) {
        name = jsonpath.query(data, chartInfo.keyJson)[0];
      }
      const val = jsonpath.query(data, chartInfo.dataJson)[0];
      seriesData.push({ value: val, name: name });
    }
    series.push({
      name: name, type: chartInfo.chartType, data: seriesData
    });
  }
  const customDataInfos = addCustomInfo({ data: data, dataCustomInfo: dataCustomInfo });
  return {
    series,
    xAxis,
    yAxis,
    customDataInfos
  };
};
