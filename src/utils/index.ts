import { toast } from "react-toastify";

export const injectStyle = (style: string) => {
    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
    const styleSheet = styleElement.sheet;
    styleSheet?.insertRule(style, styleSheet.cssRules.length);
};
export const onErrorSWR = (err: any, key: any, config: any) => {
    // eslint-disable-next-line quotes
    toast.error(`Grafik yüklenirken bir hata oluştu.`);
    // eslint-disable-next-line no-console, no-undef
    console.error({ err, key, config });
};