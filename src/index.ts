import { registerTheme } from "echarts";
export { GenericChart, PieChart } from "./components/Charts";
export interface ITheme {
  themeName: string
  obj: object
}
export const registerThemes = ({ themes }: { themes: ITheme[] }) => {
  themes.forEach((theme: ITheme) => {
    registerTheme(theme.themeName, theme.obj);
  });
};