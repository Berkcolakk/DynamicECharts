import ReactECharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import { getPieChartData } from "../../../services/chart";
import { IDynamicService } from "../../../types/chartTypes";
import useSWR from "swr";
import LoadingBox from "../../LoadingBox";
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

export const PieChart = ({
  theme,
  isScroll = false,
  series,
  legend,
  selectableLegend = true,
  isHalf = false,
  cbFn,
  dynamicService,
  textColor,
  chartTitle,
  refreshRefetchMs
}: IPieChartProps) => {
  const { data } = useSWR(
    chartTitle,
    async () => {
      return await getPieChartData(dynamicService);
    },
    {
      refreshInterval: refreshRefetchMs
    }
  );
  const [chartData, setChartData] = useState<any>(series || []);

  useEffect(() => {
    const getData = async () => {
      if (series && series?.length > 0) {
        return;
      }

      setChartData(data);
    };

    getData();
  }, [data]);
  const length: number | any = series?.length;
  const customTooltipFormatter = (params: any) => {
    let dataItem;
    let value;
    let totalValue;
    let percentage;
    let text = "";

    const dataIndex = params.dataIndex;

    for (let i = 0; i < length; i++) {
      dataItem = series?.[i]?.data?.[dataIndex];
      value = series?.[i]?.data?.[dataIndex].value * (isHalf
        ? 2
        : 1);
      totalValue = series?.[i].data?.reduce((acc: any, item: any) => acc + item.value, 0);
      percentage = ((value / totalValue) * 100).toFixed(2);
      text += `${series?.[i]?.name}: ${value} (${percentage}%) <br/>`;
    }

    return `${params.marker} ${series?.[0]?.data?.[dataIndex].name} <br/> ${text}`;
  };
  const option = {
    textStyle: {
      color: textColor
    },
    title: {
      text: chartTitle,
      left: "center",
      textStyle: {
        fontSize: 12
      }
    },
    tooltip: {
      trigger: "item",
      formatter:
        length > 1
          ? customTooltipFormatter
          : (params: any) => {
            const name = params.name;
            const value = params.value * (isHalf
              ? 2
              : 1);
            const percent = params.percent * (isHalf
              ? 2
              : 1);

            return ` ${params.marker} ${name} <br/>${value} (${percent}%)`;
          },
      position(pos: any, params: any, el: any, elRect: any, size: any) {
        const obj: any = { marginTop: "1px" };

        obj[["left", "right"][Number(pos[0] < size.viewSize[0] / 4)]] = 0;

        return obj;
      }
    },
    emphasis: {
      label: {
        show: true
      }
    },
    legend: legend
      ? legend
      : {
        type: isScroll && "scroll",
        textStyle: {
          color: textColor
        },
        pageIconColor: textColor,
        pageTextStyle: {
          color: "fff"
        },
        selectedMode: selectableLegend,
        top: "5%",
        left: "center",
        orient: "horizontal"
      },
    series: chartData
  };
  if (!data) return <LoadingBox />;

  return (
    <>
      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        onChartReady={cbFn}
        theme={theme}
      />
    </>
  );
};
