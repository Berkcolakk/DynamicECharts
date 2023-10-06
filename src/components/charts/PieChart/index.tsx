import React from 'react';
import { getPieChartData } from '../../../services/chart';
import type { IDynamicService } from '../../../types/chartTypes';
import type { IGenericChartProps } from '../GenericChart';
import { GenericChart } from '../GenericChart';

export const PieChart = (props: IGenericChartProps) => {
  return (
    <GenericChart {...props} yAxisData={{ show: false }} xAxisData={{ show: false }}
      swrCallBackFnc={async (dynamicService: IDynamicService) => {
        return await getPieChartData(dynamicService);
      }} />
  );
};
