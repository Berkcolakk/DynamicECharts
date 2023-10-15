import React from "react";
import { getPieChartData } from "../../../services/chart";
import { IDynamicService } from "../../../types/chartTypes";
import { GenericChart, IGenericChartProps } from "../GenericChart";

export const PieChart = (props: IGenericChartProps) => {
  return (
    <GenericChart {...props} yAxisData={{ show: false }} xAxisData={{ show: false }}
      swrCallBackFnc={async (dynamicService: IDynamicService) => {
        return await getPieChartData(dynamicService);
      }} />
  );
};
