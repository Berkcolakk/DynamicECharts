
export const injectStyle = (style: string) => {
    // eslint-disable-next-line no-undef
    const styleElement = document.createElement("style");
    // eslint-disable-next-line no-undef
    document.head.appendChild(styleElement);
    const styleSheet = styleElement.sheet;
    styleSheet?.insertRule(style, styleSheet.cssRules.length);
};
export const onErrorSWR = (err: any, key: any, config: any) => {
    // eslint-disable-next-line quotes
};