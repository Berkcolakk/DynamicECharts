import ToastifySetting from "../Toastify";
import SWRProvider from "../SWRProvider";
import React, { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <SWRProvider>
            <ToastifySetting />
            {children}
        </SWRProvider>
    );
};
export default Provider;