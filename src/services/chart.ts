import type { IChartOptions, IChartSeries, IDynamicService } from "../types/chartTypes";
import jsonpath from "jsonpath";

const getData = async (dynamicService: IDynamicService) => {
  const result = await fetch(dynamicService.dataUrl);
  const response = await result.json();
  const data = jsonpath.query(response, dynamicService.dataPath)[0];

  return data;
};

export const getPieChartData = async (dynamicService: IDynamicService) => {
  const data = await getData(dynamicService);
  const result = insertOrUpdateChartArr({
    data,
    charts: dynamicService.chart,
    xAxisKeyName: dynamicService.xAxisKeyName,
    yAxisKeyName: dynamicService.yAxisKeyName
  });

  return { type: "pie", name: "", data: result.series };
};
export const getDynamicChartData = async (dynamicService: IDynamicService) => {
  const data = await getData(dynamicService);

  return insertOrUpdateChartArr({
    data,
    charts: dynamicService.chart,
    xAxisKeyName: dynamicService.xAxisKeyName,
    yAxisKeyName: dynamicService.yAxisKeyName
  });
};

const insertOrUpdateChartArr = ({
  data,
  charts,
  xAxisKeyName,
  yAxisKeyName
}: {
  data: any
  charts: IChartOptions[]
  xAxisKeyName: string
  yAxisKeyName: string
}) => {
  const xAxis = [];
  const yAxis = [];
  const series = [] as IChartSeries[];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];

    for (let x = 0; x < charts.length; x++) {
      const chartInfo = charts[x];
      const name = jsonpath.query(element, chartInfo.keyJson)[0];
      const val = jsonpath.query(element, chartInfo.dataJson)[0];

      if (chartInfo.chartType === "pie") {
        series.push({ value: val, name, type: chartInfo.chartType });
        continue;
      }

      const objIndex = series.findIndex(obj => obj.name === name);

      if (objIndex !== -1) {
        const item = series.filter(obj => obj.name === name)[0];

        series[objIndex] = { type: chartInfo.chartType, name, data: [...item.data, val] };
        continue;
      }

      series.push({ type: chartInfo.chartType, name, smooth: false, data: val });
    }

    xAxis.push(element[xAxisKeyName]);
    yAxis.push(element[yAxisKeyName]);
  }

  return {
    series,
    xAxis,
    yAxis
  };
};
