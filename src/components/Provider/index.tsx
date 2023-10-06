import SWRProvider from '../SWRProvider';
import type { ReactNode } from 'react';

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <SWRProvider>
            {children}
        </SWRProvider>
    );
};
export default Provider;