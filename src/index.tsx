import * as echarts from "echarts"
export { GenericChart } from "./components/charts/GenericChart"
export { PieChart } from "./components/charts/PieChart"
import { IChartSeries } from "./types/chartTypes"
interface ITheme {
  themeName: string
  obj: object
}
export const registerThemes = ({ themes }: { themes: ITheme[] }) => {
  themes.forEach((theme: ITheme) => {
    echarts.registerTheme(theme.themeName, theme.obj)
  })
}
