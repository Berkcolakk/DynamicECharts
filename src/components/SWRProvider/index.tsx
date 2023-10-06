import type { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { onErrorSWR } from '../../utils';
import type { BareFetcher, PublicConfiguration } from 'swr/_internal';
const SWRProvider = ({ children }: { children: ReactNode }) => {
    return (
        <SWRConfig value={{
            onError: (err: any, key: string, config: Readonly<PublicConfiguration<any, any, BareFetcher<any>>>) => {
                onErrorSWR(err, key, config);
            },
            shouldRetryOnError: true, errorRetryInterval: 10000, errorRetryCount: 2
        }}>
            {children}
        </SWRConfig>
    );
};
export default SWRProvider;