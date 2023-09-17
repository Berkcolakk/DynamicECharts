export const injectStyle = (style: string) => {
    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
    const styleSheet = styleElement.sheet;
    styleSheet?.insertRule(style, styleSheet.cssRules.length);
};