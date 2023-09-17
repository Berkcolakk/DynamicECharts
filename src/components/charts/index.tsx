import { GenericChart as Generic, IGenericChartProps } from "./GenericChart";
import { IPieChartProps, PieChart as Pie } from "./PieChart";
import React from "react";
import Provider from "../Provider";

const GenericChart = (props: IGenericChartProps) => {
    return (
        <Provider>
            <Generic {...props} />
        </Provider>
    );
};
const PieChart = (props: IPieChartProps) => {
    return (
        <Provider>
            <Pie {...props}  />
        </Provider>
    );
};

export { GenericChart, PieChart };