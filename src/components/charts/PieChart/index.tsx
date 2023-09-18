import React from "react";
import { getPieChartData } from "../../../services/chart";
import { IDynamicService } from "../../../types/chartTypes";
import { GenericChart, IGenericChartProps } from "../GenericChart";

export const PieChart = (props: IGenericChartProps) => {
  return (
    <GenericChart {...props}
      swrCallBackFnc={(dynamicService: IDynamicService) => {
        return getPieChartData(dynamicService);
      }} />
  );
};
