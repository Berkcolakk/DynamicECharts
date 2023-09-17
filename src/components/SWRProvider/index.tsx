import React, { ReactNode } from "react";
import { SWRConfig } from "swr";
import { onErrorSWR } from "../../utils";
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
export default SWRProvider;