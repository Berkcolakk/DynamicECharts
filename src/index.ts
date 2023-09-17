import { registerTheme } from "echarts";
export { GenericChart, PieChart } from "./components/charts";
import { IChartSeries } from "./types/chartTypes";
interface ITheme {
  themeName: string
  obj: object
}
export const registerThemes = ({ themes }: { themes: ITheme[] }) => {
  themes.forEach((theme: ITheme) => {
    registerTheme(theme.themeName, theme.obj);
  });
};