import { GenericChart as Generic, IGenericChartProps } from "./GenericChart";
import { IPieChartProps, PieChart as Pie } from "./PieChart";
import React, { ReactNode } from "react";
import ToastifySetting from "../Toastify";
import { SWRConfig } from "swr";
import { onErrorSWR } from "../../utils";

const GenericChart = (props: IGenericChartProps) => {
    return (
        <SWRProvider>
            <ToastifySetting />
            <Generic {...props} />
        </SWRProvider>
    );
};
const PieChart = (props: IPieChartProps) => {
    return (
        <SWRProvider>
            <ToastifySetting />
            <Pie {...props} />
        </SWRProvider>
    );
};

const SWRProvider = ({ children }: { children: ReactNode }) => {
    return (
        <SWRConfig value={{
            onError: (error, key, config) => {
                onErrorSWR(error, key, config);
            },
            shouldRetryOnError: true, errorRetryInterval: 10000, errorRetryCount: 5
        }}>
            {children}
        </SWRConfig>
    );
};

export { GenericChart, PieChart };