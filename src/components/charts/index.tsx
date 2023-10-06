import type { IGenericChartProps } from './GenericChart';
import { GenericChart as Generic } from './GenericChart';
import { PieChart as Pie } from './PieChart';
import React from 'react';
import Provider from '../Provider';

const GenericChart = (props: IGenericChartProps) => {
    return (
        <Provider>
            <Generic {...props} />
        </Provider>
    );
};
const PieChart = (props: IGenericChartProps) => {
    return (
        <Provider>
            <Pie {...props} />
        </Provider>
    );
};

export { GenericChart, PieChart };